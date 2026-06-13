import uploadImage from "../services/cloudinaryService.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import { connectDB } from "../connection.js";
import { getIO } from "../socket/socket.js";

/* =====================================================
   CREATE AUCTION
===================================================== */

export const createAuction = async (req, res) => {

    try {

        await connectDB();

        const {
            itemName,
            startingPrice,
            itemDescription,
            itemCategory,
            itemStartDate,
            itemEndDate,
        } = req.body;

        let imageUrl = "";

        if (req.file) {

            try {

                imageUrl = await uploadImage(req.file);

            } catch (error) {

                return res.status(500).json({
                    message: "Error uploading image",
                    error: error.message,
                });

            }

        }

        const start = itemStartDate
            ? new Date(itemStartDate)
            : new Date();

        const end = new Date(itemEndDate);

        if (end <= start) {

            return res.status(400).json({
                message:
                    "Auction end date must be after start date",
            });

        }

        const newAuction = new Product({

            itemName,

            startingPrice,

            currentPrice: startingPrice,

            itemDescription,

            itemCategory,

            itemPhoto: imageUrl,

            itemStartDate: start,

            itemEndDate: end,

            seller: req.user.id,

        });

        await newAuction.save();

        res.status(201).json({

            message: "Auction created successfully",

            newAuction,

        });

    } catch (error) {

        res.status(500).json({

            message: "Error creating auction",

            error: error.message,

        });

    }

};



/* =====================================================
   SHOW ALL AUCTIONS
===================================================== */

export const showAuction = async (req, res) => {

    try {

        await connectDB();

        const auction = await Product.find({
            itemEndDate: { $gt: new Date() },
        })

            .populate("seller", "name")

            .populate("bids.bidder", "name")

            .select(
                "itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller"
            )

            .sort({ createdAt: -1 });



        const formatted = auction.map((auction) => {

            let highestBidder = "No bids yet";

            if (auction.bids.length > 0) {

                const highestBid = auction.bids.reduce(
                    (prev, current) =>

                        current.bidAmount > prev.bidAmount
                            ? current
                            : prev
                );

                highestBidder =
                    highestBid.bidder?.name ||
                    "No bids yet";

            }

            return {

                _id: auction._id,

                itemName: auction.itemName,

                itemDescription:
                    auction.itemDescription,

                currentPrice: auction.currentPrice,

                bidsCount: auction.bids.length,

                itemEndDate: auction.itemEndDate,

                itemCategory: auction.itemCategory,

                sellerName: auction.seller.name,

                highestBidder,

                itemPhoto: auction.itemPhoto,

            };

        });

        res.status(200).json(formatted);

    } catch (error) {

        return res.status(500).json({
            
            message: "Error fetching auctions",

            error: error.message,

        });

    }

};



/* =====================================================
   AUCTION BY ID
===================================================== */

export const auctionById = async (req, res) => {

    try {

        await connectDB();

        const { id } = req.params;

        const auction = await Product.findById(id)

            .populate("seller", "name email avatar")
  .populate("bids.bidder", "name avatar");

        auction.bids.sort(
            (a, b) =>
                new Date(b.bidTime) -
                new Date(a.bidTime)
        );

        res.status(200).json(auction);

    } catch (error) {

        return res.status(500).json({

            message: "Error fetching auction",

            error: error.message,

        });

    }

};



/* =====================================================
   PLACE BID
===================================================== */

export const placeBid = async (req, res) => {

    try {

        await connectDB();

        const bidAmount = Number(req.body.bidAmount);

        const user = req.user.id;

        const { id } = req.params;

        const io = getIO();

        const product = await Product.findById(id)
            .populate("bids.bidder", "name");



        /* AUCTION NOT FOUND */

        if (!product) {

            return res.status(404).json({

                message: "Auction not found",

            });

        }



        /* AUCTION ENDED */

        if (
            new Date(product.itemEndDate) <
            new Date()
        ) {

            return res.status(400).json({

                message: "Auction has already ended",

            });

        }



        /* VALIDATE BID */

        const currentHighestBid = Math.max(
            product.currentPrice,
            product.startingPrice
        );

        if (bidAmount <= currentHighestBid) {

            return res.status(400).json({

                message: `Bid must be higher than ₹${currentHighestBid}`,

            });

        }



        /* SAVE BID */

        product.bids.push({

            bidder: user,

            bidAmount: bidAmount,

        });

        product.currentPrice = bidAmount;

        await product.save();



        /* SOCKET UPDATE */

        io.to(id).emit("bidUpdated", {

            auctionId: id,

            amount: bidAmount,

            bidder: user,

        });



        res.status(200).json({

            message: "Bid placed successfully",

            currentPrice: bidAmount,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Error placing bid",

            error: error.message,

        });

    }

};



/* =====================================================
   DASHBOARD DATA
===================================================== */

export const dashboardData = async (req, res) => {

    try {

        await connectDB();

        const userObjectId =
            new mongoose.Types.ObjectId(req.user.id);

        const dateNow = new Date();



        const stats = await Product.aggregate([

            {

                $facet: {

                    totalAuctions: [
                        { $count: "count" },
                    ],

                    userAuctionCount: [

                        {
                            $match: {
                                seller: userObjectId,
                            },
                        },

                        { $count: "count" },

                    ],

                    activeAuctions: [

                        {
                            $match: {
                                itemStartDate: {
                                    $lte: dateNow,
                                },

                                itemEndDate: {
                                    $gte: dateNow,
                                },
                            },
                        },

                        { $count: "count" },

                    ],

                    userBidsCount: [

                        { $unwind: "$bids" },

                        {
                            $match: {
                                "bids.bidder":
                                    userObjectId,
                            },
                        },

                        { $count: "count" },

                    ],
                    userAuctionWinCount: [

  {
    $match: {

      itemEndDate: { $lt: dateNow },

      bids: { $exists: true, $ne: [] }

    }
  },

  {
    $project: {

      highestBidder: {

        $arrayElemAt: [
          "$bids.bidder",
          -1
        ]

      }

    }
  },

  {
    $match: {

      highestBidder: userObjectId

    }
  },

  {
    $count: "count"
  }

]

                },

            },

        ]);



        const totalAuctions =
            stats[0].totalAuctions[0]?.count || 0;

        const userAuctionCount =
            stats[0].userAuctionCount[0]?.count || 0;

        const activeAuctions =
            stats[0].activeAuctions[0]?.count || 0;

        const userBidsCount =
            stats[0].userBidsCount[0]?.count || 0;

        const userAuctionWinCount =
            stats[0].userAuctionWinCount[0]?.count || 0;

        /* GLOBAL AUCTIONS */

        const globalAuction = await Product.find({
            itemEndDate: { $gt: dateNow },
        })

            .populate("seller", "name")

            .populate("bids.bidder", "name")

            .sort({ createdAt: -1 })

            .limit(3);



        const latestAuctions = globalAuction.map(
            (auction) => {

                let highestBidder =
                    "No bids yet";

                if (auction.bids.length > 0) {

                    const highestBid =
                        auction.bids.reduce(
                            (prev, current) =>

                                current.bidAmount >
                                prev.bidAmount
                                    ? current
                                    : prev
                        );

                    highestBidder =
                        highestBid.bidder?.name ||
                        "No bids yet";

                }

                return {

                    _id: auction._id,

                    itemName: auction.itemName,

                    itemDescription:
                        auction.itemDescription,

                    currentPrice:
                        auction.currentPrice,

                    bidsCount:
                        auction.bids.length,

                    timeLeft: Math.max(
                        0,
                        new Date(
                            auction.itemEndDate
                        ) - new Date()
                    ),

                    itemEndDate:
                        auction.itemEndDate,

                    itemCategory:
                        auction.itemCategory,

                    sellerName:
                        auction.seller.name,

                    highestBidder,

                    itemPhoto:
                        auction.itemPhoto,

                };

            }
        );



        /* USER AUCTIONS */

        const userAuction = await Product.find({
            seller: userObjectId,
        })

            .populate("seller", "name")

            .populate("bids.bidder", "name")

            .sort({ createdAt: -1 })

            .limit(3);



        const latestUserAuctions =
            userAuction.map((auction) => {

                let highestBidder =
                    "No bids yet";

                if (auction.bids.length > 0) {

                    const highestBid =
                        auction.bids.reduce(
                            (prev, current) =>

                                current.bidAmount >
                                prev.bidAmount
                                    ? current
                                    : prev
                        );

                    highestBidder =
                        highestBid.bidder?.name ||
                        "No bids yet";

                }

                return {

                    _id: auction._id,

                    itemName: auction.itemName,

                    itemDescription:
                        auction.itemDescription,

                    currentPrice:
                        auction.currentPrice,

                    bidsCount:
                        auction.bids.length,

                    timeLeft: Math.max(
                        0,
                        new Date(
                            auction.itemEndDate
                        ) - new Date()
                    ),

                    itemEndDate:
                        auction.itemEndDate,

                    itemCategory:
                        auction.itemCategory,

                    sellerName:
                        auction.seller.name,

                    highestBidder,

                    itemPhoto:
                        auction.itemPhoto,

                };

            });

const totalEarnings = await Product.aggregate([
  {
    $match: {
      seller: userObjectId,
      itemEndDate: { $lt: dateNow },
    },
  },
  {
    $group: {
      _id: null,
      total: {
        $sum: "$currentPrice",
      },
    },
  },
]);

const totalUserEarnings =
  totalEarnings[0]?.total || 0;

       return res.status(200).json({

    totalAuctions,

    userAuctionCount,

    activeAuctions,

    userBidsCount,

    userAuctionWinCount,

    totalUserEarnings,

    latestAuctions,

    latestUserAuctions,

});

    } catch (error) {

        res.status(500).json({

            message: "Error getting dashboard data",

            error: error.message,

        });

    }

};



/* =====================================================
   MY AUCTIONS
===================================================== */

export const myAuction = async (req, res) => {

    try {

        await connectDB();

        const auction = await Product.find({
            seller: req.user.id,
        })

            .populate("seller", "name")

            .populate("bids.bidder", "name")

            .select(
                "itemName itemDescription currentPrice bids itemEndDate itemCategory itemPhoto seller"
            )

            .sort({ createdAt: -1 });



        const formatted = auction.map((auction) => {

            let highestBidder = "No bids yet";

            if (auction.bids.length > 0) {

                const highestBid = auction.bids.reduce(
                    (prev, current) =>

                        current.bidAmount > prev.bidAmount
                            ? current
                            : prev
                );

                highestBidder =
                    highestBid.bidder?.name ||
                    "No bids yet";

            }

            return {

                _id: auction._id,

                itemName: auction.itemName,

                itemDescription:
                    auction.itemDescription,

                currentPrice: auction.currentPrice,

                bidsCount: auction.bids.length,

                timeLeft: Math.max(
                    0,
                    new Date(auction.itemEndDate) -
                        new Date()
                ),

                itemEndDate: auction.itemEndDate,

                itemCategory: auction.itemCategory,

                sellerName: auction.seller.name,

                highestBidder,

                itemPhoto: auction.itemPhoto,

            };

        });

        res.status(200).json(formatted);

    } catch (error) {

        return res.status(500).json({

            message: "Error fetching auctions",

            error: error.message,

        });

    }

};
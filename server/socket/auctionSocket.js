export const auctionSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("✅ User connected:", socket.id);

        // Join auction room
        socket.on("joinAuction", (auctionId) => {

            socket.join(auctionId);

            console.log(
                `📌 User joined auction: ${auctionId}`
            );

        });

        // Disconnect
        socket.on("disconnect", () => {

            console.log("❌ User disconnected");

        });

    });

};
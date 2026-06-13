import axios from "axios";

const VITE_API = import.meta.env.VITE_API;

/* =========================================
   CHANGE PASSWORD
========================================= */

export const changePassword = async (formData) => {

  try {

    const res = await axios.patch(

      `${VITE_API}/user`,

      formData,

      {
        withCredentials: true,
      }

    );

    return res.data;

  } catch (error) {

    console.log(
      error?.response?.data?.error ||
      "Can't update password"
    );

    throw error;

  }

};



/* =========================================
   LOGIN HISTORY
========================================= */

export const loginHistory = async () => {

  try {

    const res = await axios.get(

      `${VITE_API}/user/logins`,

      {
        withCredentials: true,
      }

    );

    return res.data;

  } catch (error) {

    console.log(
      error?.response?.data?.error ||
      "Can't show login history"
    );

    throw error;

  }

};



/* =========================================
   UPLOAD PROFILE PHOTO
========================================= */

export const uploadAvatar = async (formData) => {

  try {

    const res = await axios.post(

      `${VITE_API}/user/upload-avatar`,

      formData,

      {
        withCredentials: true,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

    );

    return res.data;

  } catch (error) {

    console.log(
      error?.response?.data?.message ||
      "Can't upload profile photo"
    );

    throw error;

  }

};
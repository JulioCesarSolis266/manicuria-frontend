import toast from "react-hot-toast"; // ✅ Toast for notifications

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    }

    const data = await res.json(); // ✅ CLAVE

    return data;
  } catch (error) {
    console.error("Error de red:", error);
    toast.error("Error de red. Por favor, inténtalo de nuevo.");
    return null;
  }
};

// import toast from "react-hot-toast"; // ✅ Toast for notifications

// export const fetchWithAuth = async (url, options = {}) => {
//   const token = localStorage.getItem("token");

//   try {
//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         ...(options.body instanceof FormData
//           ? {}
//           : { "Content-Type": "application/json" }),
//         Authorization: `Bearer ${token}`,
//         ...(options.headers || {}),
//       },
//     });

//     if (res.status === 401 || res.status === 403) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//       return null;
//     }

//     const data = await res.json(); // ✅ CLAVE

//     return data;
//   } catch (error) {
//     console.error("Error de red:", error);
//     toast.error("Error de red. Por favor, inténtalo de nuevo.");
//     return null;
//   }
// };

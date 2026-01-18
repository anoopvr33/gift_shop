import { getId } from "../utils";
import CustomAxios from "../utils/axios";
import { DeleteAllCartHook } from "./cartHook";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const BuyNow = async (amounttt) => {
  const keyData = await CustomAxios.get("/api/v1/getkey");
  const response = await CustomAxios.post("/api/v1/payment/process", {
    amount: amounttt,
  });

  console.log("getKey", keyData.data.key);
  console.log("joomaka", response.data.order.id);

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------

  // <script>

  // const detail = {
  //   productId: product_id,
  //   customerId: getId(),
  //   seller:u_id
  // };

  // Open Razorpay Checkout
  //   const options = {
  //     key: keyData.data.key, // Replace with your Razorpay key_id
  //     amount: amounttt, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: "INR",
  //     name: "HighTake",
  //     description: "RazorPay Test Transaction",
  //     order_id: response.data.order.id, // This is the order_id created in the backend
  //     // callback_url: `/api/v1/paymentVerification/${getId()}`, // Your success URL
  //     handler: async function (response) {
  //       // await CustomAxios.post(
  //       //   `/api/v1/paymentVerification/${getId()}`,
  //       //   response
  //       // );
  //       console.log("payment responses", response);
  //     },
  //     prefill: {
  //       name: "Anoop VR",
  //       email: "anoopvr@example.com",
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   const rzp = new Razorpay(options);
  //   rzp.open();

  //   </script>

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  const isLoad = await loadRazorpay();
  if (!isLoad) {
    alert("Razorpay SDK failed to load. Check your internet connection.");
    return;
  }
  const options = {
    key: keyData.data.key,
    amount: amounttt,
    currency: "INR",
    name: "HighTake",
    description: "RazorPay Test Transaction",
    order_id: response.data.order.id,

    handler: async function (response) {
      const res = await CustomAxios.post(
        `/api/v1/paymentVerification/${getId()}`,
        response
      );
      console.log("HANDLER FIRED:", response);

      if (res.data.success) {
        DeleteAllCartHook(res);
        // window.location.href = `/payment-success?reference=${res.data.reference}`;
      }
    },

    modal: {
      ondismiss: function () {
        console.log("Checkout closed");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

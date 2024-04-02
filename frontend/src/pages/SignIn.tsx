import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
// import firebaseApp, { firebaseConfig } from "../config/firebaseConfig";
// import firebase from "firebase/compat/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   UserCredential,
// } from "firebase/auth";

export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
      //1. show the toast
      //2. navigate to the home page
    },
    onError: (error: Error) => {
      //show the toast
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);

    // signInWithEmail(data.email, data.password);
  });
  // const signInWithEmail = async (email: string, password: string) => {
  //   const auth = getAuth(firebaseApp);
  //   console.log(password);
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // User signed in successfully
  //       const user = userCredential.user;
  //       console.log("User signed in:", user);
  //     })
  //     .catch((error) => {
  //       // Handle sign-in errors
  //       console.error("Error signing in:", error);
  //     });
  // };
  /////// Google Auth

  // const signInWithGoogle = async () => {
  //   firebase.initializeApp(firebaseConfig);
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user?.email);
  //     });
  // };

  // const signOut = async () => {
  //   try {
  //     const result = await firebase.auth().signOut();
  //     console.log("sign out", result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not Registered?{" "}
            <Link className="underline" to="/register">
              Create an account here
            </Link>
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Login
          </button>
        </span>
      </form>
      <div className="flex flex-row justify-center gap-3">
        {/* <button
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          onClick={signInWithGoogle}
        >
          Signin with Google
        </button>
        <button
          className="bg-red-600 text-white p-2 font-bold hover:bg-red-500 text-xl"
          onClick={signOut}
        >
          SignOut
        </button> */}
      </div>
    </div>
  );
};

export default SignIn;

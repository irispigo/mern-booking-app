import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";

//The useContext hook is a feature provided by React, a popular JavaScript library for building user interfaces.
//It allows functional components to consume values from a React context without having to explicitly pass them through the component tree as props.

//Context provides a way to share values like themes, preferred language, or user authentication status across many components without
//having to explicitly pass props at every level of the component tree.
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: Boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  //// create a provider component (AppContextProvider) that wraps around the components that need access to the context.
  /// It uses MyContext.Provider to make the context value available to its descendants.
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  ///consumes the context value using the useContext hook.
  const context = useContext(AppContext);
  return context as AppContext;
};

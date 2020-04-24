import React from 'react';


const AUTH_CONTEXT_ERROR = '找不到身份验证上下文。 是否用AuthContext.Consumer包装了组件？';
// export const AppContext = React.createContext(authContext);
export const AuthContext = React.createContext<{
    signIn: () => void;
    signOut: () => void;
}>({
    signIn: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    },
    signOut: () => {
        throw new Error(AUTH_CONTEXT_ERROR);
    }
});

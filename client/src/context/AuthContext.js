import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "62bdacbac058f3e3bbcfaa17",
    username: "lana rhodes",
    email: "lanarhodes145@gmail.com",
    password: "$2b$10$ngAqo2w1xKEasyWweHogHuVuwxN6z9OCqLs4PWed/Dj5B6J4TYFvq",
    profilePic: "person/3.jpeg",
    coverPic: "",
    followers: [
      "629f33834b9af6a2dfdf8465",
      "629f65497eeb6069d65f2b49",
      "62bdad04c058f3e3bbcfaa1b",
    ],
    followings: [
      "629f33834b9af6a2dfdf8465",
      "629f65497eeb6069d65f2b49",
      "62bdacedc058f3e3bbcfaa19",
    ],
    isAdmin: false,
    createdAt: { $date: { $numberLong: "1656597690335" } },
    updatedAt: { $date: { $numberLong: "1656599430705" } },
    __v: { $numberInt: "0" },
    bio: "I shoot kinky stuff",
    location: "LA,USA",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
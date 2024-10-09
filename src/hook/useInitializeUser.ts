import { useEffect } from "react";
import { useAppDispatch } from "../hook/useAppDispatch";
import { useGetCurrentUserQuery } from "../store/slices/getProductApi";
import { setUser } from "../store/slices/userSlice";
import { fetchCartByUserId } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export const useInitializeUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem("authToken"),
  });

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          firstName: user.firstName,
          lastName: user.lastName,
        })
      );
      dispatch(fetchCartByUserId(user.id));
    } else if (isError) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  }, [user, isError, dispatch, navigate]);

  return { isLoading, isError };
};

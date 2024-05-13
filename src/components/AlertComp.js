import { useSelector } from "react-redux";
import { alertSelector } from "../redux/reducers/alertReducer";

export const AlertComp = () => {
  const { message } = useSelector(alertSelector);

  return message ? <div className="alert">{message}</div> : <></>;
};

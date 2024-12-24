import MapComp from "../../components/map-comp/MapComp";
import DetailsComp from "../../components/details-comp/DetailsComp";
import Styles from "./style.module.css";
const MainComp = () => {
  return (
    <div className={Styles.mainComp}>
      <MapComp />
      <DetailsComp />
    </div>
  );
};

export default MainComp;

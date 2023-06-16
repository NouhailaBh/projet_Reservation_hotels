import Sidebar from "../../components/sidebar/Sidebar";

import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured2 from "../../components/featured/Featured2";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home2 = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured2 />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home2;

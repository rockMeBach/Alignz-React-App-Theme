import React from "react";
import PageHeader from "../../components/PageHeader";
import Subscription from "../../components/Subscription/Subscription";
import PricingTableCard2 from "../../components/Pages/PricingTableCard2";
import { PriceCardData2 } from "../../Data/Pages";

const Pricing = () => {
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container">
          <PageHeader
            HeaderText="Pricing"
            Breadcrumb={[{ name: "Pricing", navigate: "" }]}
          />
          <div className="row clearfix">
            {PriceCardData2.map((data, i) => {
              return (
                <PricingTableCard2
                  key={i}
                  imag={data.image}
                  head={data.head}
                  list={data.list}
                  price={data.price}
                  joined={data.joined}
                />
              );
            })}
          </div>
          <div className="row clearfix">
            <div
              className="col-12"
              style={{
                border: "1px solid gray",
                borderRadius: "16px",
                opacity: "1",
                marginBottom: "50px",
                paddingBottom: "40px",
              }}
            >
              <Subscription />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

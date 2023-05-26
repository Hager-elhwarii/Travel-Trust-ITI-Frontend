import React from "react";
import CheckoutCard from "../../../components/shared/CheckoutCard";

const MeetingPoint = () => {
  return (
    <section className="container grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div>
          <h3 className="font-bold mb-2 2xs:text-base sm:text-lg 2xl:text-2xl ">
            Where will we meet
          </h3>
          <h3 className="2xs:text-sm sm:text-base 2xl:text-xl">
            We will meet at Campo Manin, under the Manin statue and from there
            the experience will start.
          </h3>
        </div>
      </div>

      <div className="lg:col-span-1"></div>

      <div className="lg:col-span-3 2xs:mt-10 lg:mt-0">
        <CheckoutCard />
      </div>
    </section>
  );
};

export default MeetingPoint;
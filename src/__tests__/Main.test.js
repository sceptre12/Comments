import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import Main, { sortDateDesc } from "../Main";

describe("Testing Main.js", () => {
  const container = shallow(<Main />);
  it("Testing Main.js Snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("Testing Date Sorting", () => {
    let timeStamp1 = moment().subtract(56, "hours");
    let timeStamp2 = moment().subtract(20, "hours");
    const tempDateList = [
      { created: timeStamp1.toDate() },
      { created: timeStamp2.toDate() },
    ];
    tempDateList.sort(sortDateDesc);
    expect(tempDateList).toEqual([
      { created: timeStamp2.toDate() },
      { created: timeStamp1.toDate() },
    ]);
  });
});

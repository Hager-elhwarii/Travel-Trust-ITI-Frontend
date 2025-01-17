import React from "react";
import NavBar from "../../../components/shared/Admin/Admin-NavBar";
import CardIcon from "../../../components/Admin/cardIcon";
import SubNavBar from "../../../components/shared/Admin/SubNavBar.jsx/index.jsx";
import Icon from "../../../utils/icons";
import Avatar from "../../../components/Avatar";

//imports datagrid
import { Table, Tag } from "antd";
import useSearchDatagrid from "../../../hooks/useSearchDataGrid";
import DataGrid from "../../../components/shared/Admin/Data-grid";
import useModal from "../../../hooks/useModal";
import CustomModal from "../../../components/shared/Admin/CustomModal";
import CategoryLocalStatistics from "../../../components/Admin/categoryLocalStatistics";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../services/Home";
import { getUserData } from "../../../services/user";

//dynamic data
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const data = [
  {
    key: "1",
    tourID: "#123456",
    billingName: (
      <Avatar
        name="magid moustafa"
        image="https://media.istockphoto.com/id/108271508/photo/young-gray-cat.jpg?s=612x612&w=0&k=20&c=Cnra41iZ85qkZGDJB3cDNQ41BTg0vgl11Mlgu-OpjwM="
      />
    ),
    orderDate: "01.oct 2020",
    total: 1000,
    paymentMethod: "master card",
  },
  {
    key: "2",
    tourID: "#123456",
    billingName: (
      <Avatar
        name="mai moustafa"
        image="https://media.istockphoto.com/id/108271508/photo/young-gray-cat.jpg?s=612x612&w=0&k=20&c=Cnra41iZ85qkZGDJB3cDNQ41BTg0vgl11Mlgu-OpjwM="
      />
    ),
    orderDate: "01.oct 2020",
    total: 2000,
    paymentMethod: "master card",
  },
];

const DashBoard = () => {
  //custom hook
  const { getColumnSearchProps } = useSearchDatagrid();
  const { loading, open, showModal, handleOk, handleCancel } = useModal();

  // table structure
  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Tour ID",
      dataIndex: "tourID",
      key: "tourID",
      //fixed column  NOTE: Do not use percentage
      width: 150,
      fixed: "left",
      //search
      ...getColumnSearchProps("tourID"),
    },
    {
      title: "Billing Name",
      dataIndex: "billingName",
      key: "billingName",
      //   width: "20%",
      //search
      ...getColumnSearchProps("billingName"),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      //search
      ...getColumnSearchProps("orderDate"),
    },
    {
      title: "Total (EPG)",
      dataIndex: "total",
      key: "total",
      //search
      ...getColumnSearchProps("orderDate"),
      //sort
      sorter: (a, b) => a.total - b.total,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      //search
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Action",
      key: "operation",
      //fixed column
      fixed: "right",
      width: 100,
      //action icons
      render: () => (
        <>
          <button
            onClick={showModal}
            className="flex justify-center items-center "
          >
            <Icon name="delete" />
          </button>
          <CustomModal
            open={open}
            loading={loading}
            handleOk={handleOk}
            handleCancel={handleCancel}
            title="You Are About To Delete This Transiction"
            message1="this will delete it from your history"
            message2="are you sure ?"
          />
        </>
      ),
    },
  ];

  // const {
  //   data: categories,
  //   isLoading: isCategoriesLoading,
  //   error,
  // } = useQuery("categories", getAllCategories);

  // const localId = localStorage.getItem("localId");
  // const { data } = getUserData(localId);

  const { data: user } = getUserData(2);
  console.log("user", user);

  return (
    <>
      <div className="flex flex-row  bg-admin-grey">
        <NavBar />
        <div className="w-full container mx-auto">
          <SubNavBar />
          <div className="grid lg:grid-cols-6 lg:grid-flow-row auto-rows-max w-full  gap-5 h-fill md:mt-8 mt-32 ">
            <div className="col-span-6 lg:col-span-4  flex justify-between items-center  p-10 rounded-2xl shadow-md bg-white">
              <div>
                <h2 className=" text-3xl font-medium">Hi username ! </h2>
                <p className=" mt-6">Welcome to your Dashboard</p>
              </div>
              <div className="">
                <img src="../../../src/assets/images/Admin/hi.png" />
              </div>
            </div>

            <div className="2xs:col-span-6 lg:col-span-2 row-span-3 rounded-2xl shadow-md bg-white p-8">
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="flex flex-col justify-center items-center w-full bg-[rgb(0,158,183,0.8)] text-white p-10 rounded-2xl">
                  <p className=" text-6xl ">{user?.data?.stats?.minPrice}</p>
                  <p className=" text-center mt-2">Min Price of your Tours</p>
                </div>
                <div className="w-full bg-[rgb(219,58,52,0.8)] text-white rounded-2xl p-10">
                  <p className=" text-6xl ">{user?.data?.stats?.maxPrice}</p>
                  <p className=" text-center mt-2">Max Price of your Tours</p>
                </div>
              </div>
              <div>
                <h3 className=" text-2xl font-bold">Tours By Category</h3>
                {user &&
                  Object.entries(user?.data?.stats?.categories).map(
                    ([key, value]) => {
                      return (
                        <CategoryLocalStatistics
                          key={key}
                          name={key}
                          tourNum={value}
                        />
                      );
                    }
                  )}
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 ">
              <CardIcon
                name="suitcase"
                title="Total Earnings"
                generalStatistics="34,123.00 "
                type="EGP"
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 ">
              <CardIcon
                name="layers"
                title="Total Tours"
                generalStatistics="34,123.00 "
                type="Tours"
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 ">
              <CardIcon
                name="shadedUser"
                title="Today Views"
                generalStatistics="22"
                type="Views"
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 ">
              <CardIcon
                name="wallet"
                title="Today Expense"
                generalStatistics="22"
                type="EGP"
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-md mt-12 p-10 bg-white">
            <h2 className=" font-semibold text-xl">Latest Transaction</h2>
            <DataGrid data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

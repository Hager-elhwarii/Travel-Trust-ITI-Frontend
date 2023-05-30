import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";

import Header from "../../containers/UserProfile/Header";
import ProfileTabs from "../../containers/UserProfile/ProfileTabs";

import CustomInput from "./../../components/shared/FormComponents/CustomInput/index";
import CustomButton from "../../components/shared/CustomButton";

import useUploadImage from "./../../hooks/useUploadImage";

import Icon from "../../utils/icons";
import UserImage from "../../assets/images/UserProfile/userprofile.png";

const UserProfile = () => {
  // ------- hooks --------
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    userImageUrl,
    userCoverUrl,
    userImageRef,
    userCoverRef,
    handleButtonClick,
    onImageChange,
  } = useUploadImage();

  // --------- States -----------
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------- Handlers -----------
  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const editProfileHandler = (data) => {
    console.log(data);
    setLoading(true);
    // call Api
    // setLoading(false);
    // setOpenModal(false);
  };

  return (
    <>
      <Header />
      <ProfileTabs showModal={showModal} />

      <Modal
        title="Edit Your Profile"
        open={openModal}
        onCancel={handleCancel}
        footer={null}
        centered
        bodyStyle={{ height: 400, overflow: "auto" }}
      >
        <form onSubmit={handleSubmit(editProfileHandler)}>
          <div
            className={`relative hero place-items-start min-h-[10rem] ${
              !userCoverUrl ? "bg-lighter-gray" : ""
            }`}
            style={{
              backgroundImage: `url(${userCoverUrl})`,
            }}
          >
            <div className="h-full w-full flex justify-center items-center">
              <div>
                <input
                  {...register("user-cover")}
                  id="coverImage"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  name="user-cover"
                  onChange={(e) => onImageChange(e, "userCover")}
                />
                <Button
                  icon={<Icon name="addImage" />}
                  onClick={() => handleButtonClick("coverBtn")}
                  className="my-custom-btn flex justify-center items-center gap-2 border-none shadow-none"
                >
                  <span className="2xs:text-sm sm:text-base 2xl:text-xl">
                    Add cover photo
                  </span>
                </Button>
              </div>
            </div>

            <div className="absolute bottom-0 left-[5%] avatar translate-y-1/2">
              <div className="relative w-24 rounded-full border-2 border-solid border-white">
                <img
                  className="object-cover"
                  src={userImageUrl ? userImageUrl : UserImage}
                />
              </div>
              <input
                {...register("user-image")}
                id="profileImage"
                className="hidden"
                type="file"
                accept="image/*"
                name="user-image"
                onChange={(e) => onImageChange(e, "userImage")}
              />
              <Button
                icon={<Icon name="camera" />}
                onClick={() => handleButtonClick("imgBtn")}
                className="my-custom-btn absolute bottom-0 right-0 translate-y-1/4 flex justify-center items-center bg-white p-4 rounded-full"
              ></Button>
            </div>
          </div>

          <div className="mt-[75px]">
            <CustomInput
              edit
              type="text"
              name="username"
              label="Username"
              register={register}
              rule="username"
              errors={errors}
            />
            <CustomInput
              edit
              type="number"
              name="phone"
              label="Phone Number"
              register={register}
              rule="phone_Num"
              errors={errors}
            />
            <CustomInput
              edit
              type="text"
              name="city"
              label="City"
              register={register}
              rule="city"
              errors={errors}
            />
            <textarea
              {...register("bio")}
              className="textarea border-black px-2.5 py-4 2xs:text-sm 2xl:text-lg w-full resize-none focus:outline-none"
              placeholder="Write something about yourself"
              name="bio"
            ></textarea>
            <div className="flex justify-end gap-2">
              <CustomButton
                onClick={handleCancel}
                type="quadruple"
                value="Cancel"
              />
              <CustomButton
                // onClick={handleOk}
                submit="submit"
                type="secondary"
                value="Save"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;

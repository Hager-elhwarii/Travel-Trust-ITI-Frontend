import { useNavigate, useParams } from "react-router-dom";
import { request } from "./axios";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";

export const useTour = () => {
  const navigate = useNavigate();

  //1- Add Tour
  const addTour = (tour) => {
    return request({
      url: "/v1/tours",
      method: "POST",
      data: tour,
      formData: true,
      successMsg: "You have added your tour successfully",
    });
  };

  const addTourMutation = useMutation(addTour, {
    onSuccess: (res) => {
      console.log(res);
      if (res.success) {
        //------------------------------------------------------------------- organizer id
        navigate(`/admin/alltours/${organizerId}`);
      }
    },
    onError: (err) => console.log(err),
  });

  //2- Get organizer tours
  const getOrganizerTours = ({ queryKey }) => {
    const organizerID = queryKey[1];
    // console.log("organizerID", organizerID);
    return request({
      url: `/v1/tours/organizer/${organizerID}`,
      method: "GET",
    });
  };

  const OrganizerTours = (organizerID) => {
    return useQuery(["oraganizerTours", organizerID], getOrganizerTours);
  };

  //3- Get Tour By Id
  const getTourById = ({ queryKey }) => {
    const tourID = queryKey[1];
    // console.log("tourID", tourID);

    return request({
      url: `/v1/tours/${tourID}`,
      method: "GET",
    });
  };

  const TourById = (tourID) => {
    return useQuery(["tourById", tourID], getTourById);
  };

  //3- Delete Tour By Id
  const deleteTourById = (tourID) => {
    return request({
      url: `/v1/tours/${tourID}`,
      method: "DELETE",
    });
  };

  const DeleteTourByIdmutation = useMutation((tourID) => {
    return deleteTourById(tourID);
  });

  //4- Update Tour By Id
  const updateTourById = ({ id, tour }) => {
    console.log("update");

    return request({
      url: `/v1/tours/${id}`,
      method: "PATCH",
      data: tour,
      formData: true,
      successMsg: "You have updated your tour successfully",
    });
  };

  const updateTourByIdMutation = useMutation(updateTourById, {
    onSuccess: (res) => {
      console.log(res);
      if (res.success) {
        //------------------------------------------------------------------- organizer id
        navigate(`/admin/alltours/${organizerId}`);
      }
    },
    onError: (err) => console.log(err),
  });

  return {
    addTourMutation,
    OrganizerTours,
    TourById,
    DeleteTourByIdmutation,
    updateTourByIdMutation,
  };
};
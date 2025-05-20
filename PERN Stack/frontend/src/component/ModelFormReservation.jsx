import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema
const schemaFeedback = z.object({
  full_name: z.string().trim().min(1, "Please enter your full name"),
  phone: z.string().trim().min(1, "Please enter your phone number"),
  time: z.string().trim().min(1, "Please select a time"),
  place: z.string().trim().min(1, "Please enter the place"),
  number_of_customer: z
    .string()
    .trim()
    .min(1, "Please enter quantity")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive number",
    }),
  branch_id: z.string().trim().min(1, "Please select a branch"),
});

export const ModelFormReservation = ({ isOpen, onClose }) => {
  const [listBranch, setListBranch] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaFeedback),
    defaultValues: {
      full_name: "",
      phone: "",
      time: "",
      place: "",
      number_of_customer: "",
      branch_id: "",
      type: "",
      content: "",
    },
  });
  console.log(errors);

  const getListBranch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_WEB_SERVICE}/branch`
      );
      setListBranch(data.branch || []);
    } catch (err) {
      console.error("Failed to fetch branch list:", err);
    }
  };

  const onSubmit = async (data) => {
    if (data) {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_WEB_SERVICE}/reservation`,
          {
            ...data,
            reservation_time: data.time
              ? format(new Date(data.time), "mm:hh")
              : "",
            reservation_date: data.time
              ? format(new Date(data.time), "dd/MM/yyyy")
              : "",
          }
        );
        alert("Book a table successfully");
        onClose();
      } catch (err) {
        console.error("Failed to fetch branch list:", err);
        alert("Reservation failed, please try again");
      }
    }
  };

  useEffect(() => {
    getListBranch();
  }, []);

  return (
    <div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reservation</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 gy-2">
                <label>Full name</label>
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Full name"
                      className="w-100 form-control"
                    />
                  )}
                />
                {errors.full_name && (
                  <p className="text-danger">{errors.full_name.message}</p>
                )}
              </div>

              <div className="col-12 gy-2">
                <label>Phone number</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Phone number"
                      className="w-100 form-control"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-danger">{errors.phone.message}</p>
                )}
              </div>

              <div className="col-12 gy-2">
                <label>Time</label>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="datetime-local"
                      {...field}
                      className="w-100 form-control"
                    />
                  )}
                />
                {errors.time && (
                  <p className="text-danger">{errors.time.message}</p>
                )}
              </div>

              <div className="col-12 gy-2">
                <label>Place</label>
                <Controller
                  name="place"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Place"
                      className="w-100 form-control"
                    />
                  )}
                />
                {errors.place && (
                  <p className="text-danger">{errors.place.message}</p>
                )}
              </div>

              <div className="col-12 gy-2">
                <label>Quantity</label>
                <Controller
                  name="number_of_customer"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      placeholder="Quantity"
                      className="w-100 form-control"
                    />
                  )}
                />
                {errors.number_of_customer && (
                  <p className="text-danger">
                    {errors.number_of_customer.message}
                  </p>
                )}
              </div>

              <div className="col-12 gy-2">
                <label>Branch</label>
                <Controller
                  name="branch_id"
                  control={control}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      <option value="" disabled>
                        Select a branch
                      </option>
                      {listBranch.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.address}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.branch_id && (
                  <p className="text-danger">{errors.branch_id.message}</p>
                )}
              </div>

              <div className="d-flex justify-content-end gy-2 ">
                <button className="btn btn-primary rounded" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

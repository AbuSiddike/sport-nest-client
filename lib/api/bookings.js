import api from "./axiosClient";

export function getMyBookings(email) {
  return api.get("/bookings/mine", { params: { email } }).then((r) => r.data);
}

export function createBooking(data) {
  return api.post("/bookings", data).then((r) => r.data);
}

export function cancelBooking(id, email) {
  return api.patch(`/bookings/${id}/cancel`, undefined, { params: { email } }).then((r) => r.data);
}

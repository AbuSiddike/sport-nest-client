import api from "./axiosClient";

export function getFacilities({ search, types } = {}) {
  const params = {};
  if (search) params.search = search;
  if (types) params.types = types;
  return api.get("/facilities", { params }).then((r) => r.data);
}

export function getFeaturedFacilities() {
  return api.get("/facilities/featured").then((r) => r.data);
}

export function getFacilityById(id) {
  return api.get(`/facilities/${id}`).then((r) => r.data);
}

export function getMyFacilities(email) {
  return api.get("/facilities/mine", { params: { email } }).then((r) => r.data);
}

export function createFacility(data) {
  return api.post("/facilities", data).then((r) => r.data);
}

export function updateFacility(id, data) {
  return api.patch(`/facilities/${id}`, data).then((r) => r.data);
}

export function deleteFacility(id, email) {
  return api.delete(`/facilities/${id}`, { params: { email } }).then((r) => r.data);
}

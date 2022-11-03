import { carsList } from "../../data/carsData";

export default function handler(req, res) {
  res.status(200).json(carsList);
}

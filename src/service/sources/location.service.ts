import axios from "axios";
import { Config } from "../config";

const apiUrl = Config.apiUrl;
const apiRoutes = Config.apiRoutes;

async function getById(id: number): Promise<ILocation> {
    const url = Config.setPathVariables(`${apiUrl}/${apiRoutes.getLocationById}`, {
        id: id
    });
    const {data} = await axios.get(url);
    return data;
}

export const LocationService = {
    getById
};
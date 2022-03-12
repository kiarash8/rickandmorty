import axios from "axios";
import { Config } from "../config";

const apiUrl = Config.apiUrl;
const apiRoutes = Config.apiRoutes;

async function getByIds(ids: number | number[]): Promise<IEpisode[]> {
    const url = Config.setPathVariables(`${apiUrl}/${apiRoutes.getMultipleEpisodesByIds}`, {
        ids: ids
    });
    const {data} = await axios.get(url);
    return data;
}

export const EpisodesService = {
    getByIds
};
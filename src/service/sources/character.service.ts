import axios from "axios";
import { Config } from "../config";

const apiUrl = Config.apiUrl;
const apiRoutes = Config.apiRoutes;

async function getAll(
    page?: number,
): Promise<{
    info: IInfo;
    results: ICharacter[];
}> {
    let url = `${apiUrl}/${apiRoutes.getAllCharacters}`;
    const queryParams = {
        ...(page && {page: page}),
    };
    if (Object.keys(queryParams).length > 0)
        url = `${url}?${Config.setQueryParams(queryParams)}`

    const {data} = await axios.get(url);
    return data;
}

async function getById(id: number): Promise<ICharacter> {
    const url = Config.setPathVariables(`${apiUrl}/${apiRoutes.getCharacterById}`, {
        id: id
    });
    const {data} = await axios.get(url);
    return data;
}

export const CharacterService = {
    getAll,
    getById
};
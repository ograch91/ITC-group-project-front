import { useApi } from "../UseApi";
export const ApiWrapper = ({ method = "get", path, args = {}, onRender }) => {
    //mixed
    const { data, isLoading, err } = useApi(method, path, args);

    //shared
    if (err) {
        return <h4 style={{ color: 'red' }}>{err}</h4>
    }
    if (isLoading) {
        return <h4>loading....</h4>
    }

    return onRender && onRender(data);
}
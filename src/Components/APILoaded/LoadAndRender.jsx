import { useApi } from '../../Hooks/UseApi';

export const LoadAndRender = ({
  method = 'get',
  path,
  args = {},
  onRender,
  onErr,
  onLoading,
}) => {
  //mixed
  const { data, isLoading, err } = useApi(method, path, args);
  //shared
  if (err) {
    if (onErr) {
      return onErr(err);
    }
    return <h4 style={{ color: 'red' }}>{err}</h4>;
  }

  if (isLoading) {
    if (onLoading) {
      return onLoading();
    }
    return <h4>loading....</h4>;
  }

  return onRender && onRender(data);
};

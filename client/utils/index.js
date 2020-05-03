import i18n from 'i18next';
import { toast } from 'react-toastify';

export default (e) => {
  const key = e.response ? 'server' : 'network';
  toast.error(i18n.t(key));
};

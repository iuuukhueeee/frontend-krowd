import { useContext } from 'react';

import { SettingsContext } from '../contexts/setting-context';

const useSettings = () => useContext(SettingsContext);

export default useSettings;

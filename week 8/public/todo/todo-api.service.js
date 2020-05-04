const BDOMEALS_API = `${BASE_API_URL}/bdomeals`;

class BdomealsService {
  getBdomeals = () => _get(BDOMEALS_API, OPTIONS_WITH_AUTH);

  addBdomeal = (formData) =>
  _post(BDOMEALS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteBdomeal = (bdomealId) =>
  _delete(`${BDOMEALS_API}/${bdomealId}`, OPTIONS_WITH_AUTH);
}
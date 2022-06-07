const axios = require('axios');

const getMicrosoftProfile = (pat) => {
	return axios
		.get(
			'https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=6.0',
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
      console.log(response.data)
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getAllOrganizations = (publicAlias, pat) => {
  return axios
		.get(
			`https://app.vssps.visualstudio.com/_apis/accounts?memberId=${publicAlias}&api-version=6.0`,
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

const getAllOrganizationProjects = (organization, pat) => {
  return axios
		.get(
			`https://dev.azure.com/${organization}/_apis/projects?api-version=6.0`,
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			return err.response;
		});
}

const devOpsApi = {
	getMicrosoftProfile,
  getAllOrganizations,
  getAllOrganizationProjects
};

module.exports = devOpsApi;

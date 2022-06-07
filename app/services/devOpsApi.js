const axios = require('axios');

const btoa = (string) => {
	return Buffer.from(string).toString('base64');
};

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
		.then(async (response) => {
			const organizations = response.data.value;
			let result = [];
			for(let i = 0; i < organizations.length; i++) {
				const projects = await getAllOrganizationProjects(
					organizations[i].accountName,
					pat
				);
				result.push({
					accountId: organizations[i].accountId,
					accountName: organizations[i].accountName,
					projectsCount: projects.count
				});
			}
			console.log(result)
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};

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
			return response.data;
		})
		.catch((err) => {
			return err.response;
		});
};

const devOpsApi = {
	getMicrosoftProfile,
	getAllOrganizations,
	getAllOrganizationProjects,
};

module.exports = devOpsApi;

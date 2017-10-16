export const sortCaseInsensitiveByName = (a,b) => {
	const a_name = (a && a.name ? a.name.toLowerCase() : "");
	const b_name = (b && b.name ? b.name.toLowerCase() : "");
	if (a_name > b_name) return 1;
	if (a_name < b_name) return -1;
	return 0;
}

import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Sidebar(props) {
  const { contributors} = props;

  return (
		<Grid item xs={12} md={4}>
			<Typography variant="h6">Contributors</Typography>
			{contributors.map((contributor) => (
				<Link
					display="block"
					variant="body1"
					href={contributor.url}
					key={contributor.title}
				>
					{contributor.title}
				</Link>
			))}
		</Grid>
  );
}

Sidebar.propTypes = {
	contributors: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired
};

export default Sidebar;

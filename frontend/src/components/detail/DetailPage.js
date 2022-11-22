import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import './DetailPage.css';
import WelcomePost from './WelcomePost';
import Contents from './Content';
import Sidebar from './Sidebar';
import Footer from './Footer';

const sections = [
	{ title: 'Add Content +', url: '#' },
	{ title: 'Join +', url: '#' },
];

const welcomePost = {
	description:
        'All about to learning guitar with colloboratively!',
	image: 'https://i.ytimg.com/vi/iIeCN_yLl5s/maxresdefault.jpg',
	linkText: '',
};

const contents = [
	{
		title: 'Texts',
		date: '',
		description: 'All Text Contents Related to this Learning Space',
		image: 'https://i.ibb.co/KhhsrB5/Screen-Shot-2022-10-30-at-20-49-17.png',
		imageLabel: 'Image Text',
	},
	{
		title: 'Videos',
		date: '',
		description: 'All Video Contents Related to this Learning Space',
		image: 'https://i.ibb.co/phbTWYb/Screen-Shot-2022-10-30-at-20-50-30.png',
	},
];

const sidebar = {
	contributors: [
		
		{
			title: 'Ece SARKIN',
			url: 'https://github.com/bounswe/bounswe2022group1/wiki/Ece-Sark%C4%B1n',
        },
        {
			title: 'Hüseyin Seyyid Kaplan',
			url: 'https://github.com/bounswe/bounswe2022group1/wiki/H%C3%BCseyin-Seyyid',
		},
		{
			title: 'Kadir Gökhan Sezer',
			url: 'https://github.com/bounswe/bounswe2022group1/wiki/Kadir-Gokhan-Sezer',
        },
        {
			title: 'Kamil KORKUT',
			url: 'https://github.com/bounswe/bounswe2022group1/wiki/Kamil-Korkut',
		}
	]
};

const theme = createTheme();

export default function DetailPage() {
	return (
		<div className="all">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth="lg">
					<Header title="Guitar Learning Space" sections={sections} />
					<main>
						<WelcomePost post={welcomePost} />
						<Grid container spacing={4}>
							{contents.map((post) => (
								<Contents key={post.title} post={post} />
							))}
						</Grid>
						<Grid container spacing={5} sx={{ mt: 3 }}>
							<Sidebar
								contributors={sidebar.contributors}
							/>
						</Grid>
					</main>
				</Container>
				<Footer
					title="BUDEMI"
					description="a company of bogazici university"
				/>
			</ThemeProvider>
		</div>
	);
}
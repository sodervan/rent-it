import { useEffect, useState } from "react";
import Body from "../components/Body";
import {
	Badge,
	Button,
	Container,
	Flex,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { carousel_data } from "../page_data/home_page";
import { IconSearch } from "@tabler/icons-react";
const HomePage = () => {
	// const [id, setId] = useState<string>("");

	return (
		<Stack>
			<div className="w-full  h-[calc(100dvh_-_80px)] bg-red-200 relative isolate">
				<Carousel
					className="w-full h-full bg-red-500"
					loop
				>
					<Carousel.Slide className="h-[calc(100dvh_-_80px)] ">
						<div className="bg-blue-400 w-full h-full"></div>
					</Carousel.Slide>
					<Carousel.Slide className="h-[calc(100dvh_-_80px)] ">
						<div className="bg-blue-500 w-full h-full"></div>
					</Carousel.Slide>
					<Carousel.Slide className="h-[calc(100dvh_-_80px)] ">
						<div className="bg-blue-700 w-full h-full"></div>
					</Carousel.Slide>
				</Carousel>

				<Container className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-red-400 flex">
					<Stack
						className="bg-red-200 w-full "
						align="center"
						justify="center"
					>
						<Title size={44}>
							Find Your Perfect Home, Hassle Free
						</Title>
						<Text>
							Simplifying apartment hunting for students and
							renters with transparency, reliability, and ease
						</Text>
						<Group justify="center">
							{carousel_data.pills.map((e) => (
								<Badge
									key={e}
									size="lg"
									radius={"sm"}
								>
									{e}
								</Badge>
							))}
						</Group>
						<Flex>
							<TextInput
								placeholder="Search..."
								w={"352px"}
							/>
							<Button leftSection={<IconSearch size={18} />}>Search</Button>
						</Flex>
					</Stack>
				</Container>
			</div>
		</Stack>
	);
};

export default HomePage;

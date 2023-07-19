import logo from '../img/logoFull.png';

const Footer = () => {
	return (
		<div className="bg-[#faf1ed]">
			<div className="container mx-auto flex gap-10 px-4 py-6">
				<img src={logo} className="h-20 hidden sm:block" />
				<div className="grid grid-cols-12 text-gray-800">
					<div className="col-span-12 lg:col-span-10 space-y-2 text-dark">
						<div className="flex space-x-3">
							<div className="w-fit">
								<p className="text-xs">© 2023 VietnamGo</p>
								<div className="flex flex-wrap">
									{[
										'Terms of Use',
										'Site Map',
										'How the site works'
									].map((item, i) => (
										<a
											key={i}
											href="#"
											className="text-[0.8em] md:text-sm font-bold underline mr-2"
										>
											{item}
										</a>
									))}
								</div>
							</div>
						</div>
						<div className="text-[0.7em] md:text-xs w-full space-y-3">
							<p>
								This is the version of our website addressed to speakers of English
								in the United States.
							</p>
							<p>
								VietnamGo makes no guarantees for availability of prices advertised
								on our sites and applications. Listed prices may require a stay of a
								particular length or have blackout dates, qualifications or other
								applicable restrictions. VietnamGo is not responsible for any
								content on external web sites that are not owned or operated by
								VietnamGo.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;

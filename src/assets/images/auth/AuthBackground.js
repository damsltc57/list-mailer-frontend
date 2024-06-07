// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
	const theme = useTheme();
	return (
		<Box sx={{ position: "absolute", filter: "blur(18px)", zIndex: -1, bottom: 0 }}>
			{/*<svg width="235px" height="54px" viewBox="0 0 235 54" version="1.1" xmlns="http://www.w3.org/2000/svg">*/}
			{/*	<title>Inexploré</title>*/}
			{/*	<g id="Inexploré" stroke="none" strokeWidth="1" fill="red" fillRule="evenodd">*/}
			{/*		<g id="01_Profil" transform="translate(-62.000000, -2226.000000)" fill="red" fillRule="nonzero">*/}
			{/*			<g id="Footer" transform="translate(0.000000, 2167.000000)">*/}
			{/*				<g id="Inexplore_Logo_seul_01" transform="translate(62.000000, 59.000000)">*/}
			{/*					<path*/}
			{/*						d="M2,42.647066 L2,18.352934 C3.44917918,18.1166217 4.93922459,18 6.47013622,18 C7.9193154,18 9.42822214,18.1166217 11,18.352934 L11,42.647066 C9.55082082,42.8833783 8.03877052,43 6.47013622,43 C5.02095704,43 3.53091163,42.8833783 2,42.647066 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M1.95,11.0362085 C0.65,9.72901292 0,8.20595018 0,6.46102399 C0,5.63952952 0.21766055,4.71909594 0.65,3.7027214 C1.08233945,2.68634686 1.84266055,1.81388376 2.925,1.08833026 C4.00733945,0.362776753 5.2,0 6.5,0 C8.23233945,0 9.75,0.641605166 11.05,1.9248155 C12.35,3.20802583 13,4.71909594 13,6.46402214 C13,8.20894834 12.35,9.73201107 11.05,11.0392066 C9.75,12.3464022 8.2353211,13 6.5,13 C4.7646789,13 3.25,12.3464022 1.95,11.0392066 L1.95,11.0362085 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M35.6320053,14.8776835 C37.3219399,15.4607812 38.7032516,16.2777254 39.7759405,17.3285161 C40.8516258,18.3793067 41.6576407,19.6335742 42.1939851,21.0913185 C42.7303296,22.5490627 43,24.1343596 43,25.8472091 L43,42.6507488 C41.5797359,42.8845952 40.1414937,43 38.6822772,43 C37.2230607,43 35.8237709,42.8845952 34.3645544,42.6507488 L34.3645544,27.247251 C34.3645544,26.3513457 34.2117412,25.4675882 33.9031184,24.5929417 C33.5944956,23.7182951 33.0191988,23.0471254 32.1772278,22.5794324 C31.3322606,22.1117394 30.3344801,21.877893 29.1838864,21.877893 C28.8003551,21.877893 28.1561425,21.9447063 27.2542448,22.0813698 C26.3523471,22.2180333 25.4594385,22.5369149 24.5785151,23.0440884 L24.5785151,42.6507488 C23.158251,42.8845952 21.7200089,43 20.2607924,43 C18.8794806,43 17.4592165,42.8845952 16,42.6507488 L16,18.6101162 C16.8839197,17.7931721 18.1214072,16.9944497 19.7124625,16.2169861 C21.3065143,15.4395225 23.0144268,14.8746466 24.8362002,14.5253953 C26.6579736,14.1761441 28.3179447,14 29.8161136,14 C32.0034402,14 33.9420708,14.2915489 35.629009,14.8746466 L35.6320053,14.8776835 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M74.7072419,31.5342748 L55.9984592,31.5342748 C56.5100154,35.2470879 58.8212635,37.1064839 62.9260401,37.1064839 C64.1494607,37.1064839 65.403698,36.9151634 66.6856703,36.5325224 C67.9676425,36.1498815 69.4776579,35.4234615 71.2157165,34.3502732 C72.0847458,35.0019586 72.8058552,35.8629007 73.375963,36.9360891 C73.9491525,38.0092774 74.2942989,39.0794763 74.4114022,40.1526647 C70.9383667,42.7175549 66.7935285,44 61.9768875,44 C59.844376,44 57.853621,43.6741573 55.9984592,43.0224719 C54.1432974,42.3707865 52.5439137,41.4321204 51.2033898,40.2094629 C49.8597843,38.9838161 48.8243451,37.4711885 48.0939908,35.6715802 C47.3636364,33.871972 47,31.8631069 47,29.6419957 C47,27.573343 47.366718,25.6302443 48.0939908,23.8126997 C48.8243451,21.9951551 49.8597843,20.4227399 51.2033898,19.1044222 C52.5439137,17.7831151 54.1155624,16.7697145 55.9090909,16.0612308 C57.7057011,15.3527471 59.6286595,15 61.6810478,15 C63.6163328,15 65.4098613,15.2959489 67.0677966,15.890836 C68.7257319,16.4857231 70.146379,17.3257396 71.3297381,18.4168642 C72.5130971,19.5079889 73.422188,20.8382641 74.0539291,22.4076899 C74.6856703,23.9771158 75,25.6810638 75,27.5195341 C75,29.0500979 74.9013867,30.3923307 74.7041602,31.5402536 L74.7072419,31.5342748 Z M66.6548536,26.7094114 C66.6548536,25.675085 66.4360555,24.7364189 66.0046225,23.8964024 C65.5701079,23.0533966 64.9599384,22.4495413 64.1679507,22.087826 C63.3790447,21.7231213 62.568567,21.5228327 61.7395994,21.4839707 C60.1217257,21.4839707 58.8089368,21.9622719 57.8012327,22.9188743 C56.7935285,23.8754768 56.192604,25.1399856 55.9953775,26.7094114 L66.651772,26.7094114 L66.6548536,26.7094114 Z"*/}
			{/*						id="Shape"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M106,42.5363441 C105.808555,42.6507527 105.156446,42.7591398 104.046665,42.8554839 C102.936883,42.951828 101.785223,43 100.597667,43 C98.8357762,43 97.4178881,42.9217204 96.3440024,42.768172 L90.5976668,34.3230108 L85.3090039,42.768172 C84.0077774,42.9217204 82.6646724,43 81.2856716,43 C78.9494466,43 77.1875561,42.8464516 76,42.5363441 L85.5961711,28.9427957 L76.1705055,15.7526882 C76.6311696,15.56 77.5195932,15.3853763 78.8417589,15.231828 C80.1639246,15.0782796 81.4771164,15 82.7783428,15 C83.8522285,15 84.7915046,15.0572043 85.5931798,15.1746237 L90.995513,23.5625806 L96.110679,15.1746237 C97.1456775,15.0602151 98.180676,15 99.2156745,15 C100.059228,15 101.130123,15.0662366 102.43434,15.2017204 C103.738558,15.3372043 104.695782,15.5208602 105.309004,15.7496774 L96,28.9969892 L106,42.5333333 L106,42.5363441 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M127.617738,14.9180932 C129.530536,15.5291318 131.187679,16.4410839 132.589166,17.6600906 C133.990653,18.8790973 135.074881,20.4235818 135.844928,22.2904736 C136.614976,24.1573655 137,26.2913948 137,28.6925616 C137,31.0937284 136.596495,33.0588777 135.786405,34.9472634 C134.976314,36.835649 133.864365,38.4384739 132.441317,39.7557381 C131.021349,41.0730022 129.373447,42.0770707 127.50069,42.764873 C125.627934,43.4526752 123.662772,43.7965763 121.611365,43.7965763 C119.797132,43.7965763 118.198513,43.6184847 116.818587,43.2653719 L116.818587,53.6468872 C115.358577,53.8833193 113.880085,54 112.380032,54 C110.960064,54 109.500053,53.8833193 108,53.6468872 L108,18.3079757 C109.6171,17.049052 111.579182,16.0173486 113.889326,15.209795 C116.196389,14.4022415 118.712905,14 121.435794,14 C123.644291,14 125.708019,14.303984 127.620818,14.9150226 L127.617738,14.9180932 Z M124.127881,35.5368082 C125.252151,35.1437783 126.19777,34.3577186 126.967817,33.1755585 C127.737865,31.9964689 128.122889,30.5809473 128.122889,28.9289936 C128.122889,27.27704 127.737865,25.9290704 126.967817,24.7714746 C126.19777,23.6108083 125.230589,22.8247486 124.069357,22.4102249 C122.905045,21.9957012 121.811577,21.7899747 120.785874,21.7899747 C119.405948,21.7899747 118.084546,22.04483 116.821668,22.5576111 L116.821668,35.4170569 C117.847371,35.8899209 119.208816,36.126353 120.906001,36.126353 C121.931705,36.126353 123.006691,35.929838 124.130961,35.5368082 L124.127881,35.5368082 Z"*/}
			{/*						id="Shape"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M228.140389,10 C228.927004,10 229.55393,9.68295115 230.133541,9.08474576 C230.710195,8.48953141 231,7.79561316 231,7 C231,6.40478564 230.837354,5.85742772 230.509105,5.36091725 C230.180856,4.86440678 229.790506,4.51744766 229.33214,4.31704885 C228.873774,4.11964108 228.512996,4 228.140389,4 L214.859611,4 C214.072996,4 213.44607,4.31704885 212.866459,4.91525424 C212.289805,5.51046859 212,6.20438684 212,7 C212,7.59521436 212.162646,8.14257228 212.490895,8.63908275 C212.819144,9.13559322 213.209494,9.48255234 213.66786,9.68295115 C214.126226,9.88035892 214.487004,10 214.859611,10 L228.140389,10 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M162.971177,42.9681725 C161.145717,42.2782341 159.557446,41.2802875 158.21237,39.9804928 C156.867294,38.6776181 155.828463,37.0913758 155.095877,35.2156057 C154.366293,33.3429158 154,31.2792608 154,29.0308008 C154,26.7823409 154.3753,24.7895277 155.125901,22.9353183 C155.876501,21.0811088 156.924339,19.4825462 158.269416,18.1427105 C159.614492,16.7997947 161.220777,15.7741273 163.085268,15.0657084 C164.94976,14.3542094 166.940352,14 169.057046,14 C171.173739,14 173.152322,14.3542094 174.998799,15.0657084 C176.845276,15.7772074 178.439552,16.7905544 179.78763,18.1119097 C181.132706,19.4332649 182.171537,21.0318275 182.904123,22.9045175 C183.633707,24.7772074 184,26.8193018 184,29.0308008 C184,31.2422998 183.6247,33.2227926 182.874099,35.0954825 C182.123499,36.9681725 181.075661,38.5667351 179.730584,39.8880903 C178.385508,41.2094456 176.779223,42.2258727 174.914732,42.9342916 C173.05024,43.6427105 171.059648,44 168.942954,44 C166.826261,44 164.79964,43.6550308 162.971177,42.9650924 L162.971177,42.9681725 Z M173.641713,34.5657084 C174.776621,33.164271 175.344075,31.3193018 175.344075,29.0338809 C175.344075,26.74846 174.776621,24.9004107 173.641713,23.5020534 C172.506805,22.100616 170.960568,21.4014374 168.996998,21.4014374 C167.033427,21.4014374 165.478183,22.100616 164.32526,23.5020534 C163.172338,24.9034908 162.595877,26.74846 162.595877,29.0338809 C162.595877,31.3193018 163.172338,33.1673511 164.32526,34.5657084 C165.478183,35.9671458 167.036429,36.6663244 168.996998,36.6663244 C170.957566,36.6663244 172.506805,35.9671458 173.641713,34.5657084 Z"*/}
			{/*						id="Shape"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M207,14.8217022 C206.919896,17.8620002 206.09113,20.3758002 204.513702,22.3631021 C203.527809,22.0892014 202.403275,21.952251 201.140101,21.952251 C199.365494,21.952251 197.923626,22.2261517 196.820658,22.7709099 L196.820658,42.6500157 C195.400357,42.884353 193.921518,43 192.38106,43 C190.960759,43 189.500405,42.884353 188,42.6500157 L188,18.2667646 C188.828766,17.5272327 189.9533,16.7937874 191.373601,16.0755588 C192.793903,15.3542869 194.325118,14.8277889 195.961083,14.4960646 C197.60013,14.1643404 199.109778,14 200.490028,14 C203.0934,14 205.265445,14.2739007 207,14.8186588 L207,14.8217022 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M234.707242,31.5342748 L215.998459,31.5342748 C216.510015,35.2470879 218.821263,37.1064839 222.92604,37.1064839 C224.149461,37.1064839 225.403698,36.9151634 226.68567,36.5325224 C227.967643,36.1498815 229.477658,35.4234615 231.215716,34.3502732 C232.084746,35.0019586 232.805855,35.8629007 233.375963,36.9360891 C233.949153,38.0092774 234.294299,39.0794763 234.411402,40.1526647 C230.938367,42.7175549 226.793529,44 221.976888,44 C219.844376,44 217.853621,43.6741573 215.998459,43.0224719 C214.143297,42.3707865 212.543914,41.4321204 211.20339,40.2094629 C209.859784,38.9838161 208.824345,37.4711885 208.093991,35.6715802 C207.363636,33.871972 207,31.8631069 207,29.6419957 C207,27.573343 207.366718,25.6302443 208.093991,23.8126997 C208.824345,21.9951551 209.859784,20.4227399 211.20339,19.1044222 C212.543914,17.7831151 214.115562,16.7697145 215.909091,16.0612308 C217.705701,15.3527471 219.628659,15 221.681048,15 C223.616333,15 225.409861,15.2959489 227.067797,15.890836 C228.725732,16.4857231 230.146379,17.3257396 231.329738,18.4168642 C232.513097,19.5079889 233.422188,20.8382641 234.053929,22.4076899 C234.68567,23.9771158 235,25.6810638 235,27.5195341 C235,29.0500979 234.901387,30.3923307 234.70416,31.5402536 L234.707242,31.5342748 Z M226.654854,26.7094114 C226.654854,25.675085 226.436055,24.7364189 226.004622,23.8964024 C225.570108,23.0533966 224.959938,22.4495413 224.167951,22.087826 C223.379045,21.7231213 222.568567,21.5228327 221.739599,21.4839707 C220.121726,21.4839707 218.808937,21.9622719 217.801233,22.9188743 C216.793529,23.8754768 216.192604,25.1399856 215.995378,26.7094114 L226.651772,26.7094114 L226.654854,26.7094114 Z"*/}
			{/*						id="Shape"*/}
			{/*					></path>*/}
			{/*					<path*/}
			{/*						d="M141,7.49889516 L141,42.6517718 C142.561416,42.8849333 144.079112,43 145.559334,43 C147.158223,43 148.638446,42.8849333 150,42.6517718 L150,6 C147.083276,6.72370898 144.075989,7.22939684 141,7.50192323 L141,7.49889516 Z"*/}
			{/*						id="Path"*/}
			{/*					></path>*/}
			{/*				</g>*/}
			{/*			</g>*/}
			{/*		</g>*/}
			{/*	</g>*/}
			{/*</svg>*/}
		</Box>
	);
};

export default AuthBackground;

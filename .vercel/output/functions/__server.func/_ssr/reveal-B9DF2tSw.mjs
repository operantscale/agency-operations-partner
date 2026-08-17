import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reveal-B9DF2tSw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, delay = 0, className }) {
	const reduced = useReducedMotion();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (reduced || !mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: className ?? void 0,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: className ?? void 0,
		initial: {
			opacity: 0,
			y: 18
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .85,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children
	});
}
//#endregion
export { Reveal as t };

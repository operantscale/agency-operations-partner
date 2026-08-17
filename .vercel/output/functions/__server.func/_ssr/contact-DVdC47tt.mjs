import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as isRedirect, g as useRouter, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as ArrowRight, i as Check } from "../_libs/lucide-react.mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-footer-DKpIWgTm.mjs";
import { t as Reveal } from "./reveal-B9DF2tSw.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DVdC47tt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var discoverySchema = objectType({
	fullName: stringType().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
	workEmail: stringType().trim().email("Please enter a valid work email").max(255, "Email is too long"),
	agencyName: stringType().trim().min(2, "Please enter your agency name").max(150, "Agency name is too long"),
	role: stringType().trim().max(100, "Role is too long").optional().or(literalType("")),
	agencyWebsite: stringType().trim().max(200, "Website URL is too long").optional().or(literalType("")),
	primaryChallenge: stringType().trim().min(10, "A sentence or two is enough").max(1e3, "Please keep this under 1000 characters"),
	additionalContext: stringType().trim().max(2e3, "Additional context is too long").optional().or(literalType(""))
});
/**
* Uses Supabase's REST API directly instead of @supabase/supabase-js.
*
* This intentionally avoids importing the Supabase functions-js dependency
* that was causing the production:
*
* ERR_MODULE_NOT_FOUND: Cannot find package 'tslib'
*/
var submitDiscoveryRequest = createServerFn({ method: "POST" }).validator(discoverySchema).handler(createSsrRpc("d617a46fdf585928d24717a1a82d4f39df931f582c18829da984df70c8f99096"));
var FIELDS = [
	{
		name: "fullName",
		label: "Full name",
		type: "text",
		required: true,
		autoComplete: "name"
	},
	{
		name: "workEmail",
		label: "Work email",
		type: "email",
		required: true,
		autoComplete: "email"
	},
	{
		name: "agencyName",
		label: "Agency name",
		type: "text",
		required: true,
		autoComplete: "organization"
	},
	{
		name: "role",
		label: "Role",
		type: "text",
		required: false,
		autoComplete: "organization-title"
	},
	{
		name: "agencyWebsite",
		label: "Agency website",
		type: "text",
		required: false,
		autoComplete: "url"
	}
];
var SUBMISSION_ERROR_MESSAGE = "We couldn't submit your request right now. Please try again.";
function ContactPage() {
	const submit = useServerFn(submitDiscoveryRequest);
	const [values, setValues] = (0, import_react.useState)({});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [formError, setFormError] = (0, import_react.useState)("");
	const set = (name, value) => {
		setValues((v) => ({
			...v,
			[name]: value
		}));
		if (errors[name]) setErrors((e) => ({
			...e,
			[name]: ""
		}));
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		setFormError("");
		const parsed = discoverySchema.safeParse({
			fullName: values["fullName"] ?? "",
			workEmail: values["workEmail"] ?? "",
			agencyName: values["agencyName"] ?? "",
			role: values["role"] ?? "",
			agencyWebsite: values["agencyWebsite"] ?? "",
			primaryChallenge: values["primaryChallenge"] ?? "",
			additionalContext: values["additionalContext"] ?? ""
		});
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0]);
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			setStatus("error");
			return;
		}
		setStatus("loading");
		try {
			const result = await submit({ data: parsed.data });
			if (!(!!result && (result.ok === true || result.success === true))) throw new Error(SUBMISSION_ERROR_MESSAGE);
			setStatus("success");
		} catch (err) {
			setStatus("error");
			console.error("Discovery request submission failed", err);
			const message = err instanceof Error ? err.message : SUBMISSION_ERROR_MESSAGE;
			setFormError(message || SUBMISSION_ERROR_MESSAGE);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-[84rem] px-6 pt-20 pb-24 lg:px-10 lg:pt-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Operational discovery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl",
								children: "Start With a Conversation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-md text-[1.0625rem] leading-[1.7] text-muted-foreground",
								children: "Tell us a little about your agency and the operational challenge you're looking to understand. We'll use the conversation to learn how your team works and determine whether there is a meaningful opportunity for improvement."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-12 space-y-6 border-t border-border pt-8 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "eyebrow",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:wajeeh@operantscale.com",
										className: "text-foreground underline-offset-4 hover:underline",
										children: "wajeeh@operantscale.com"
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "eyebrow",
									children: "Focus"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-2 text-muted-foreground",
									children: "Independent P&C insurance agencies, United States."
								})] })]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .1,
							children: status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card p-8 sm:p-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex size-9 items-center justify-center border border-accent text-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-6 text-2xl font-medium",
										children: "Thank you. Your request has been received."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm leading-relaxed text-muted-foreground",
										children: "We'll review what you shared and reply from wajeeh@operantscale.com within two business days to schedule a short operational discovery conversation. That first call is a working session, not a sales call: we'll walk through how your team operates today and where repetitive work may be accumulating."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/",
										className: "mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline",
										children: ["Return to homepage ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit,
								noValidate: true,
								className: "border border-border bg-card p-6 sm:p-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 sm:grid-cols-2",
										children: [
											FIELDS.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: field.name === "agencyWebsite" ? "sm:col-span-2" : "",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														htmlFor: field.name,
														className: "block text-sm text-foreground",
														children: [field.label, !field.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "ml-2 text-xs text-muted-foreground",
															children: "Optional"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														id: field.name,
														name: field.name,
														type: field.type,
														autoComplete: field.autoComplete,
														value: values[field.name] ?? "",
														onChange: (e) => set(field.name, e.target.value),
														"aria-invalid": Boolean(errors[field.name]),
														"aria-describedby": errors[field.name] ? `${field.name}-error` : void 0,
														className: "mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground transition-colors outline-none focus:border-ring"
													}),
													errors[field.name] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														id: `${field.name}-error`,
														className: "mt-2 text-xs text-destructive",
														children: errors[field.name]
													})
												]
											}, field.name)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sm:col-span-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														htmlFor: "primaryChallenge",
														className: "block text-sm text-foreground",
														children: "Primary operational challenge"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														id: "primaryChallenge",
														name: "primaryChallenge",
														rows: 4,
														value: values["primaryChallenge"] ?? "",
														onChange: (e) => set("primaryChallenge", e.target.value),
														"aria-invalid": Boolean(errors["primaryChallenge"]),
														"aria-describedby": errors["primaryChallenge"] ? "primaryChallenge-error" : void 0,
														className: "mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring"
													}),
													errors["primaryChallenge"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														id: "primaryChallenge-error",
														className: "mt-2 text-xs text-destructive",
														children: errors["primaryChallenge"]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sm:col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													htmlFor: "additionalContext",
													className: "block text-sm text-foreground",
													children: ["Additional context", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-2 text-xs text-muted-foreground",
														children: "Optional"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													id: "additionalContext",
													name: "additionalContext",
													rows: 3,
													value: values["additionalContext"] ?? "",
													onChange: (e) => set("additionalContext", e.target.value),
													className: "mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-ring"
												})]
											})
										]
									}),
									formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "alert",
										className: "mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive",
										children: formError
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: status === "loading",
										className: "mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-primary px-8 text-[0.78rem] font-medium tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto",
										children: [status === "loading" ? "Sending…" : "Request an operational discovery", status !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs text-muted-foreground",
										children: "We use what you share only to prepare for the conversation."
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ContactPage as component };

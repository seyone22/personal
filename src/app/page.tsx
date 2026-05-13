"use client"

import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import {ChefHat, Github, Linkedin, Mail, Palette, Target} from "lucide-react";
import { useState } from "react";
import {Badge} from "@/components/ui/badge";

const ALL_PROJECTS = [
    // ENTERPRISE & WEB
    {
        title: "Propia / Uprise Digital",
        category: "Web & Enterprise",
        description: "Real estate investment analysis platform featuring robust data extraction pipelines to aggregate and normalize property data.",
        tags: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
    },
    {
        title: "Axallant Apthia",
        category: "Web & Enterprise",
        description: "Serverless property rental management system with strict IAM roles, Stripe integrations, and high-availability cloud deployment.",
        tags: ["Node.js", "React", "AWS", "Terraform"],
    },
    {
        title: "Providence Auto CMS",
        category: "Web & Enterprise",
        description: "Full-stack lead tracking and CRM solution built for high-volume international car dealerships.",
        tags: ["Next.js", "MongoDB", "Data Analytics"],
    },
    {
        title: "Anime.lk Event Portal",
        category: "Web & Enterprise",
        description: "Comprehensive event management and artist partner portal supporting internal review workflows and attendee routing.",
        tags: ["Next.js", "MongoDB", "Fullstack"],
        link: "https://dev.anime.lk/"
    },
    {
        title: "Anime.lk Partner Static",
        category: "Web & Enterprise",
        description: "High-performance, statically generated landing page for the Anime.lk Artist Partner Program.",
        tags: ["Astro", "Tailwind", "Static"],
        link: "https://partnerprogram.anime.lk/"
    },

    // MOBILE & WEARABLE
    {
        title: "Shot: Archery Tracker",
        category: "Mobile & WearOS",
        description: "Professional archery score tracking system with tournament management capabilities for Wear OS and Android.",
        tags: ["Kotlin", "Jetpack Compose", "Wear OS"],
        github: "https://github.com/seyone22/shot",
    },
    {
        title: "Expense Tracker",
        category: "Mobile & WearOS",
        description: "Material Expressive personal finance application designed in strict alignment with PSD2 security guidelines.",
        tags: ["Android", "Kotlin", "OCR"],
        github: "https://github.com/seyone22/expense_tracker",
    },
    {
        title: "Cook: Recipe Engine",
        category: "Mobile & WearOS",
        description: "Automated recipe and pantry management engine utilizing OCR and AI to seamlessly categorize household ingredients.",
        tags: ["Android", "Material Design", "Gemini AI"],
        github: "https://github.com/seyone22/cook",
        featured: true
    },
    {
        title: "Catfish AI",
        category: "Mobile & WearOS",
        description: "Offline voice synthesis and transcription app optimizing a custom C++ layer on TensorFlow for low-latency processing.",
        tags: ["C++", "Kotlin", "TensorFlow"],
        github: "https://github.com/seyone22/catfish",
    },
    {
        title: "Anime Wear OS",
        category: "Mobile & WearOS",
        description: "Custom wearable application bringing specialized tracking and aesthetic interfaces to the wrist.",
        tags: ["Wear OS", "Kotlin"],
    },

    // BACKEND & DATA
    {
        title: "food.seyone.dev",
        category: "Backend & Data",
        description: "Automated data aggregation engine tracking and visualizing national supermarket price trends across thousands of SKUs.",
        tags: ["Next.js", "Data Eng", "MongoDB"],
        link: "https://food.seyone.dev",
        featured: true
    },
    {
        title: "SLR Transit Server",
        category: "Backend & Data",
        description: "GTFS-compliant transit data backend handling complex scheduling, routing, and location data.",
        tags: ["NestJS", "PostgreSQL", "GTFS"],
    },
    {
        title: "Recipe Importer Core",
        category: "Backend & Data",
        description: "Robust Kotlin library utilizing JSON-LD for standardized, cross-platform recipe data extraction.",
        tags: ["Kotlin", "JSON-LD", "Library"],
    },

    // TOOLS & MISC
    {
        title: "Anime.lk POS",
        category: "Tools & Misc",
        description: "Cross-platform Point-of-Sale desktop application for high-volume convention merchandise transactions.",
        tags: ["Kotlin", "Desktop", "SQLite"],
    },
    {
        title: "University CVS Admin",
        category: "Tools & Misc",
        description: "Administrative web system built for the secure verification and management of university credentials.",
        tags: ["PHP", "MySQL", "Admin"],
    },
    {
        title: "Cert Maker Pipeline",
        category: "Tools & Misc",
        description: "Automated Python pipeline for batch-filling and generating hundreds of verified university certificates.",
        tags: ["Python", "Automation"],
    },
    {
        title: "Firefox Minimal Tab",
        category: "Tools & Misc",
        description: "A lightweight, hyper-minimalist custom new tab override for Firefox.",
        tags: ["HTML", "CSS", "Vanilla JS"],
        github: "https://github.com/seyone22/FirefoxNewTab"
    }
];

const CATEGORIES = ["All", "Web & Enterprise", "Mobile & WearOS", "Backend & Data", "Tools & Misc"];

export default function Home() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = ALL_PROJECTS.filter(
        (project) => activeFilter === "All" || project.category === activeFilter
    );

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* 01. HERO SECTION */}
            <section className="flex min-h-[80vh] flex-col justify-center px-6 py-24 sm:px-12 lg:px-24">
                <div className="max-w-3xl space-y-8">
                    <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                        Seyone Gunasingham. <br/>
                        <span className="text-primary">I build scalable platforms.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Architecting highly reliable web platforms and robust data pipelines with a focus on Node.js,
                        TypeScript, and React.
                        Currently engineering serverless cloud infrastructure for Axallant and complex data solutions at
                        Uprise Digital.
                    </p>
                    <div className="flex gap-4">
                        <Button className="rounded-full bg-primary px-8 text-white hover:bg-accent">
                            <a href="#projects">View My Work</a>
                        </Button>
                        <div className="flex items-center gap-2 px-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary" >
                                <a href="https://github.com/seyone22" target="_blank" rel="noreferrer"><Github/></a>
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary" >
                                <a href="https://linkedin.com/in/sgseyone" target="_blank" rel="noreferrer"><Linkedin/></a>
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary" >
                                <a href="mailto:s.g.seyone@proton.me"><Mail/></a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 02. PROJECTS GRID */}
            <section id={'projects'} className="min-h-screen bg-zinc-950/50 px-6 py-24 sm:px-12 lg:px-24">

                {/* --- FEATURED BENTO BOX --- */}
                <div className="mb-24">
                    <div className="mb-8">
                        <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Work</h2>
                        <p className="text-muted-foreground">High-impact platforms and architectures.</p>
                    </div>

                    {/* Bento Grid: First item spans 2 columns on desktop */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {ALL_PROJECTS.filter(p => p.featured).map((project, index) => (
                            <div
                                key={project.title}
                                className={`${index === 0 ? "md:col-span-2" : "md:col-span-1"}`}
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    tags={project.tags}
                                    github={project.github}
                                    link={project.link}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- FILTERABLE ARCHIVE --- */}
                <div>
                    <div className="mb-8 flex flex-col justify-between gap-6 border-t border-border/50 pt-12 md:flex-row md:items-end">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight">Project Archive</h2>
                            <p className="text-sm text-muted-foreground">Filter by technical domain.</p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <Button
                                    key={category}
                                    variant={activeFilter === category ? "default" : "outline"}
                                    onClick={() => setActiveFilter(category)}
                                    size="sm"
                                    className={`rounded-full transition-all ${
                                        activeFilter === category
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                    }`}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Archive Grid */}
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                github={project.github}
                                link={project.link}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 02.5 WORK EXPERIENCE & CONTRACTS */}
            <section className="border-t border-border/50 bg-background px-6 py-24 sm:px-12 lg:px-24">
                <div className="mx-auto max-w-5xl">

                    {/* --- PART 1: DAY JOBS TIMELINE --- */}
                    <div className="mb-16">
                        <div className="mb-12">
                            <h2 className="mb-2 text-3xl font-bold tracking-tight">Experience</h2>
                            <p className="text-muted-foreground">Professional roles and core technical trajectory.</p>
                        </div>

                        <div className="relative ml-3 space-y-12 border-l border-border/40 pl-8 md:max-w-3xl">
                            {/* Uprise Digital */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                                <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                                    <h3 className="text-xl font-bold text-zinc-100">Full-Stack Data Engineer</h3>
                                    <span className="font-mono text-sm text-zinc-500">Sep 2025 – Present</span>
                                </div>
                                <h4 className="mb-4 font-medium text-primary">Uprise Digital (Remote, AUS)</h4>
                                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                                    Designed Propia, a real estate investment platform utilizing Next.js, FastAPI, and PostgreSQL. Engineered resilient data extraction pipelines to aggregate and normalize large volumes of property data, alongside implementing secure multi-tenant authentication.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">Python</Badge>
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">FastAPI</Badge>
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">PostgreSQL</Badge>
                                </div>
                            </div>

                            {/* Axallant */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-zinc-700" />
                                <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                                    <h3 className="text-xl font-bold text-zinc-100">Full-Stack Software Engineer</h3>
                                    <span className="font-mono text-sm text-zinc-500">Feb 2025 – Aug 2025</span>
                                </div>
                                <h4 className="mb-4 font-medium text-zinc-300">Axallant Pvt.Ltd (Remote, USA)</h4>
                                <p className="mb-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">Intern: Nov 2024 – Jan 2025</p>
                                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                                    Architected and deployed serverless cloud infrastructure utilizing AWS Lambda, Cognito, and CloudFront via Terraform. Developed robust Node.js and Spring Boot backend services integrated with performant React interfaces, while managing secure Stripe payment workflows.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">Node.js</Badge>
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">React</Badge>
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">AWS</Badge>
                                    <Badge variant="outline" className="border-zinc-800 text-zinc-400">Terraform</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- PART 2: CONTRACT & FREELANCE CARDS --- */}
                    <div className="pt-12 border-t border-border/30">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight mb-1">Contract & Freelance</h3>
                                <p className="text-sm text-muted-foreground">Independent engineering and technical consulting.</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">

                            {/* Providence Auto */}
                            <div className="group relative flex flex-col rounded-xl border border-border/40 bg-zinc-950/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-zinc-900/60">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h4 className="font-bold text-zinc-100 group-hover:text-primary transition-colors">Providence Auto</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">Jan 2026 – Present</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-wider">Active</Badge>
                                </div>
                                <p className="mb-6 text-sm text-zinc-400 leading-relaxed flex-grow">
                                    Engineered a highly performant Next.js and TypeScript web platform for international vehicle sourcing and importation, managing end-to-end delivery and secure lead-tracking.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">Next.js</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">TypeScript</span>
                                </div>
                            </div>

                            {/* Anime.lk */}
                            <div className="group relative flex flex-col rounded-xl border border-border/40 bg-zinc-950/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-zinc-900/60">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h4 className="font-bold text-zinc-100 group-hover:text-primary transition-colors">Anime.lk</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">2022 – Present</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-wider">Active</Badge>
                                </div>
                                <p className="mb-6 text-sm text-zinc-400 leading-relaxed flex-grow">
                                    Spearheaded comprehensive platform redesign. Integrated Google Wallet API for high-volume digital ticketing and established CI/CD pipelines for zero-downtime deployments.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">Next.js</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">Google Wallet</span>
                                </div>
                            </div>

                            {/* English Tea Co */}
                            <div className="group relative flex flex-col rounded-xl border border-border/40 bg-zinc-950/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-zinc-900/60">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h4 className="font-bold text-zinc-100 group-hover:text-primary transition-colors">English Tea Co.</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">2023</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] uppercase tracking-wider">Completed</Badge>
                                </div>
                                <p className="mb-6 text-sm text-zinc-400 leading-relaxed flex-grow">
                                    Developed a specialized inventory and stock management application interfacing directly with proprietary Zebra QR Scanner hardware devices.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">Hardware</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-2 py-1">Zebra API</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* 03. PERSONAL / ACHIEVEMENTS */}
            <section className="border-t border-border px-6 py-24 sm:px-12 lg:px-24 bg-zinc-950/20">
                <div className="mb-16">
                    <h3 className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">Beyond the IDE</h3>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Life & Interests</h2>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    {/* Art Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-zinc-100">
                            <div className="rounded-md bg-primary/10 p-2 text-primary border border-primary/20">
                                <Palette className="h-5 w-5" />
                            </div>
                            <h4 className="text-xl font-bold tracking-tight">Digital Art</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            I draw and render digital art primarily using Clip Studio Paint. My aesthetic is heavily influenced by anime culture, which directly translates into my creative direction work for the Anime.lk merchandising team.
                        </p>
                        {/* Placeholder Image Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <img src="/img/artworks/1.png" alt="Digital Artwork 1" className="aspect-square rounded-xl object-cover border border-border/50 hover:border-primary/50 transition-colors" />
                            <img src="/img/artworks/2.png" alt="Digital Artwork 2" className="aspect-square rounded-xl object-cover border border-border/50 hover:border-primary/50 transition-colors" />
                            <img src="/img/artworks/3.png" alt="Digital Artwork 3" className="aspect-square rounded-xl object-cover border border-border/50 hover:border-primary/50 transition-colors" />
                            <img src="/img/artworks/4.png" alt="Digital Artwork 4" className="aspect-square rounded-xl object-cover border border-border/50 hover:border-primary/50 transition-colors" />
                        </div>
                    </div>

                    {/* Sports Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-zinc-100">
                            <div className="rounded-md bg-primary/10 p-2 text-primary border border-primary/20">
                                <Target className="h-5 w-5" />
                            </div>
                            <h4 className="text-xl font-bold tracking-tight">Sports</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            A competitive recurve archer and participant in the 22nd National Archery Championship. Off the range, I maintain a disciplined physical routine, cycling daily and focusing heavily on weightlifting.
                        </p>
                        {/* Placeholder Hero Image */}
                        <div className="relative mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-zinc-900">
                            <img src="/img/sports/1.jpg" alt="Archery Tournament" className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0" />
                        </div>
                    </div>

                    {/* Hobbies Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-zinc-100">
                            <div className="rounded-md bg-primary/10 p-2 text-primary border border-primary/20">
                                <ChefHat className="h-5 w-5" />
                            </div>
                            <h4 className="text-xl font-bold tracking-tight">Culinary & Culture</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            An avid baker and cook fascinated by food science—from mastering the physics of traditional Sri Lankan Kalu Dodol to perfecting the pastry of Willard mango custard tarts. Fluent in Japanese (JLPT N4) with a deep interest in manga localization.
                        </p>

                        {/* Status Badges */}
                        <div className="grid gap-3 pt-2">
                            <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-zinc-900/50 p-3 shadow-sm">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(20,83,45,0.8)]" />
                                <span className="text-sm font-medium text-zinc-300">Currently Reading: <span className="text-zinc-400">Spice & Wolf</span></span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-zinc-900/50 p-3 shadow-sm">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(20,83,45,0.8)]" />
                                <span className="text-sm font-medium text-zinc-300">Currently Baking: <span className="text-zinc-400">Mango Tarts</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04. FOOTER */}
            <footer className="border-t border-border/40 bg-zinc-950 px-6 py-12 sm:px-12 lg:px-24">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">

                    {/* Branding & Copyright */}
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <span className="text-lg font-bold tracking-tight text-zinc-100">Seyone Gunasingham</span>
                        <p className="text-sm text-zinc-500 text-center md:text-left">
                            &copy; {new Date().getFullYear()} All rights reserved.
                            <span className="hidden md:inline"> &nbsp;|&nbsp; </span>
                            <br className="md:hidden" />
                            Negombo, Sri Lanka.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:bg-primary/10 hover:text-primary transition-colors" >
                            <a href="https://github.com/seyone22" target="_blank" rel="noreferrer">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:bg-primary/10 hover:text-primary transition-colors" >
                            <a href="https://linkedin.com/in/sgseyone" target="_blank" rel="noreferrer">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:bg-primary/10 hover:text-primary transition-colors" >
                            <a href="mailto:s.g.seyone@proton.me">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Tech Stack Subtle Nod */}
                <div className="mx-auto mt-12 max-w-5xl text-center md:text-left">
                    <p className="text-xs font-mono text-zinc-700 uppercase tracking-widest">
                        Built with Next.js, Tailwind CSS & TypeScript.
                    </p>
                </div>
            </footer>
        </div>
    );
}
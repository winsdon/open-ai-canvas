import { currentLocale, translate } from "@/i18n";
import type { Skill, SkillCategory } from "@/services/api/skills";

export const fallbackSkillCategories: SkillCategory[] = [
    {
        value: "drama",
        get label() {
            return translate("library.skills.category.drama");
        },
    },
    {
        value: "ecommerce",
        get label() {
            return translate("library.skills.category.ecommerce");
        },
    },
    {
        value: "creative",
        get label() {
            return translate("library.skills.category.creative");
        },
    },
    {
        value: "social",
        get label() {
            return translate("library.skills.category.social");
        },
    },
    {
        value: "others",
        get label() {
            return translate("library.skills.category.others");
        },
    },
];

export function skillCategoryLabel(value: string, categories: SkillCategory[] = fallbackSkillCategories) {
    return categories.find((item) => item.value === value)?.label || translate("library.skills.category.others");
}

export function groupSkills(skills: Skill[], categories: SkillCategory[]) {
    const ordered = categories.length ? categories : fallbackSkillCategories;
    return ordered.map((category) => ({ ...category, skills: skills.filter((skill) => skill.tag === category.value) })).filter((group) => group.skills.length > 0);
}

/** 技能卡识别色：内置分类固定映射，自定义分类（平台策展根分类）按 id 稳定散列到同一组 accent token。 */
export const skillAccentNames = ["blue", "orange", "pink", "green", "violet", "cyan"] as const;
export type SkillAccent = (typeof skillAccentNames)[number];
const fixedSkillAccents: Record<string, SkillAccent> = { drama: "blue", ecommerce: "orange", creative: "pink", social: "green", others: "violet" };

export function skillAccent(category: string | undefined) {
    const key = (category || "").trim();
    if (fixedSkillAccents[key]) return fixedSkillAccents[key];
    let hash = 0;
    for (const char of key) hash = (hash * 31 + (char.codePointAt(0) || 0)) >>> 0;
    return skillAccentNames[hash % skillAccentNames.length];
}

/** 技能卡字形：取名称首个字素（兼容中文与组合 emoji），拉丁字母转大写；空名称回退「技」。 */
export function skillGlyph(name: string | undefined) {
    const value = (name || "").trim();
    const first = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(currentLocale(), { granularity: "grapheme" }).segment(value)[Symbol.iterator]().next().value?.segment : Array.from(value)[0];
    return first ? first.toLocaleUpperCase("en-US") : translate("library.skills.glyphFallback");
}

export function defaultSkillIcon(name: string, tag: string) {
    const icons: [RegExp, string][] = [
        [/分镜|镜头|storyboard/i, "storyboard"],
        [/表情|人像|portrait/i, "portrait"],
        [/世界观|美术|场景|world/i, "world"],
        [/角色|人物|character/i, "character"],
        [/套图|设计|海报|design/i, "design"],
        [/资产|转接|工作流|workflow/i, "script"],
        [/故事|创意|story/i, "story"],
        [/剧本|写作|文案|script|writing/i, "writing"],
        [/一图成片|导演|广告|director/i, "director"],
    ];
    const categoryIcons: Record<string, string> = {
        drama: "storyboard",
        ecommerce: "director",
        creative: "design",
        social: "portrait",
        others: "script",
    };
    const icon = icons.find(([pattern]) => pattern.test(name))?.[1] || categoryIcons[tag] || "story";
    return `/images/skills/${icon}.webp`;
}

export function skillIcon(skill: Pick<Skill, "skillName" | "tag" | "showcaseMedia">) {
    return skill.showcaseMedia?.find((media) => media.type === "image" && media.showcaseUrl)?.showcaseUrl || defaultSkillIcon(skill.skillName, skill.tag);
}

export function formatSkillCount(value: number) {
    return new Intl.NumberFormat(currentLocale(), { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatSkillDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return translate("library.skills.unknownTime");
    return new Intl.DateTimeFormat(currentLocale(), { year: "numeric", month: "short", day: "numeric" }).format(date);
}

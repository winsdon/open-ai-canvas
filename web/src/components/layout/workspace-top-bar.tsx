import { ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { currentLocale } from "@/i18n";

import { TopbarFeedbackButton } from "@/components/feedback/topbar-feedback-button";
import { SystemAnnouncementCenter } from "@/components/layout/system-announcement-center";
import { WorkspaceAccountMenu } from "@/components/layout/workspace-account-menu";
import { WorkspaceCreditGiftMark } from "@/components/layout/workspace-credit-gift-mark";
import { WorkspaceTopBarExtensionSlot } from "@/components/layout/workspace-top-bar-extension";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LanguageMenu } from "@/components/layout/language-menu";
import { useThemeStore } from "@/stores/use-theme-store";
import { useUserStore } from "@/stores/use-user-store";
import { useAppearanceStore } from "@/stores/use-appearance-store";
import { useWalletBalance } from "@/hooks/use-wallet-balance";
import { openWorkspaceWallet } from "@/lib/workspace-wallet";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CreationBrandMark } from "@/components/brand/creation-brand-mark";

export function WorkspaceTopBar({ sidebarOpen, onToggleSidebar }: { sidebarOpen: boolean; onToggleSidebar: () => void }) {
    const brandName = useAppearanceStore((state) => state.appearance.brandName);
    const { t } = useTranslation();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const user = useUserStore((state) => state.user);
    const creditsEnabled = useUserStore((state) => state.features.creditsEnabled);
    const { availableMicrocredits } = useWalletBalance(user?.id, creditsEnabled);
    const { pathname, search, hash } = useLocation();
    const balance = availableMicrocredits === null ? "--" : (availableMicrocredits / 1_000_000).toLocaleString(currentLocale(), { maximumFractionDigits: 2 });

    return (
        <header className="app-workspace-topbar">
            <button type="button" className="app-workspace-mobile-menu app-workspace-topbar-icon-button" aria-label={sidebarOpen ? t("shell.collapseSidebar") : t("shell.expandSidebar")} onClick={onToggleSidebar}>
                {sidebarOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
            </button>
            <Link to="/" className="creation-platform-brand" aria-label={t("shell.brandHome", { brand: brandName })}>
                <BrandLogo className="creation-platform-mark" fallback={<CreationBrandMark className="creation-platform-mark" />} />
                <span>
                    {brandName}
                    <span className="creation-platform-brand-divider"> / </span>
                    <span className="creation-platform-name">图像视频创作平台</span>
                </span>
            </Link>
            <WorkspaceTopBarExtensionSlot />
            <div className="app-workspace-topbar-actions">
                <LanguageMenu />
                {user ? <TopbarFeedbackButton /> : null}
                {creditsEnabled ? (
                    <button type="button" className="app-workspace-topbar-credit-pill" aria-label={t("shell.openWallet", { balance })} onClick={() => openWorkspaceWallet()}>
                        <WorkspaceCreditGiftMark />
                        <span>{t("shell.credits")}</span>
                        <strong>{balance}</strong>
                    </button>
                ) : null}
                {user ? <SystemAnnouncementCenter userId={user.id} className="app-workspace-topbar-icon-button" autoOpen /> : null}
                <AnimatedThemeToggler className="app-workspace-topbar-icon-button" theme={theme} onThemeChange={setTheme} aria-label={t("shell.toggleTheme")} />
                <a href={`${pathname}${search}${hash}`} target="_blank" rel="noopener noreferrer" className="creation-open-window" aria-label="在新窗口打开">
                    <ExternalLink aria-hidden="true" />
                    <span>新窗口打开</span>
                </a>
                <WorkspaceAccountMenu />
            </div>
        </header>
    );
}

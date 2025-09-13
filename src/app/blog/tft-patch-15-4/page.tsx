// src/app/blog/tft-patch-15-4/page.tsx
import Link from "next/link";

export const metadata = {
  title: "TFT Patch 15.4 – What Actually Changed (and How to Climb)",
  description:
    "Patch 15.4 TL;DR: slower combat pace, artifact/item adjustments, role & trait tuning, Power-Up changes, and practical comps/pivots.",
};

export default function TFT154Post() {
  return (
    <main className="prose prose-blue mx-auto max-w-3xl p-6">
      <Link href="/blog" className="no-underline text-sm">
        ← Back to Blog
      </Link>

      <h1>TFT Patch 15.4 – What Actually Changed (and How to Climb)</h1>
      <p className="text-gray-500">Published: Sep 9, 2025</p>

      <p>
        Patch <strong>15.4</strong> lands with a broad balance pass that adjusts
        items (including several completed items), reins in Artifacts, and
        updates traits/roles while smoothing combat pacing. The official notes
        headline these as “Item Updates, Trait adjustments and more.”
      </p>

      <h2 id="tldr">TL;DR (What matters for LP)</h2>
      <ul>
        <li>
          <strong>Artifacts & overall pace toned down.</strong> Expect slightly
          less snowball from early high-rolls and more time for boards to scale.
        </li>
        <li>
          <strong>Role/trait updates:</strong> Patch context this cycle centers
          on removing skewed burst from certain roles (e.g., Assassin tag
          removal) and reshaping Fighter sustain into scaling attack-speed
          patterns. Play lines that curve AD/AS well.
        </li>
        <li>
          <strong>Item reworks</strong> (e.g., Blue Buff, Nashor’s Tooth) shift
          best-in-slot choices; caster carries care more about regen patterns,
          while rapid attackers benefit from cleaner AS curves.
        </li>
        <li>
          <strong>Power-Ups & Prismatic Orbs</strong> receive tuning/standardization,
          reducing swinginess across lobbies.
        </li>
      </ul>

      <h2 id="systems">Key System & Item Notes</h2>
      <p>
        15.4 focuses on lowering combat pace and equalizing high-impact loot.
        Community summaries and the notes highlight{" "}
        <em>Artifact nerfs</em> and adjustments to several completed items,
        which will subtly change BIS math for many carries. Caster boards that
        relied on older Blue Buff behaviors and on-hit boards centered on
        Nashor’s-style ramps should check updated stat lines and breakpoints.
      </p>

      <h2 id="traits-roles">Traits & Roles: What to Expect</h2>
      <ul>
        <li>
          <strong>Assassin removal</strong> reduces access to generic crit-burst
          win-cons; look for comps that generate consistent DPS through traits
          or items instead of isolated execute spikes.
        </li>
        <li>
          <strong>Fighter rework</strong> pivots away from baseline Omnivamp
          toward <em>scaling attack speed</em>, rewarding frontline carries that
          live long enough to stack. Consider pairing with sustain from items or
          utility units (not just BT).
        </li>
        <li>
          <strong>Power-Up changes</strong> and several unit-specific Power-Ups
          (e.g., Lux, Aatrox, Kennen, Kobuko) are called out in the notes—be
          mindful of how these modify carry patterns and mana flow.
        </li>
      </ul>

      <h2 id="meta">Practical Meta Gameplan</h2>
      <p>
        With a slightly slower pace and toned Artifacts, default to{" "}
        <strong>flex tempo</strong>: play strongest board, preserve HP, and aim
        for a stable 4–6 unit core at 3-2. Because Fighter sustain is lower by
        default, emphasize <em>frontline durability</em> (armor/MR + utility CC)
        and feed carries consistent AS/AP instead of gambling on burst-only
        lines. External recaps also point to a nerf-focused patch that should
        make more comps viable through fundamentals.
      </p>

      <h3>Starter Lines to Try</h3>
      <ol>
        <li>
          <strong>AD Flex with Fighter Frontline:</strong> Build around a
          two-carry structure (primary rapid attacker + secondary utility DPS).
          Prioritize sword/bow → AS/AD items; add sustain via support units or
          defensive items on tanks (not just BT on carry due to role shifts).
        </li>
        <li>
          <strong>Regen Caster Boards:</strong> With item reworks (e.g., Blue
          Buff & regen-centric tuning), AP carries care more about{" "}
          <em>cast cadence</em> and mana regeneration than raw flat mana; slam
          early AP + mana-regen pairings to maintain tempo.
        </li>
        <li>
          <strong>Balanced Frontline + Utility Backline:</strong> Given the pace
          changes and reduced Artifact tempo, this is a safe pivot when your
          main line doesn’t hit—good for climbing consistently.
        </li>
      </ol>

      <h2 id="notes-link">Official Notes & Further Reading</h2>
      <ul>
        <li>
          Official Patch 15.4 Notes (Riot): details on Item Updates, trait
          changes, and Power-Ups.
        </li>
        <li>
          Blitz TL;DR recap (useful for quick reminders and prismatic/orb
          context).
        </li>
        <li>
          Esports.gg overview (role/trait & item rework highlights).
        </li>
      </ul>

      <hr />
      <p className="text-sm text-gray-500">
        Note: This article summarizes public patch notes and respected community
        recaps. Always cross-check exact numeric values in the official notes
        before tournaments or ranked pushes.
      </p>
    </main>
  );
}

import RuleCard from "../components/ruleCard";
import Rule from "../types/Rule";

const rules = () => {
  return (
    <div>
      <h4 className="text-center py-3 font-bold px-3">
        Any user of Gary Portal is subject to the following Policies. Any abuse
        of these policies can be reported via Gary Portal Reporting features, or
        by contacting a staff member.
      </h4>
      <h4 className="text-center px-3">
        These policies are subject to change at any time, continue to check back here for the latest updates
      </h4>
      {rulesList.map((item) => (
        <RuleCard key={item.ruleId} rule={item} />
      ))}
    </div>
  );
};

const rulesList: Rule[] = [
  {
    ruleId: "A",
    ruleName: "Respect",
    rules: [
      {
        subRule: 1,
        rule: "Any and all members accessing the Gary Portal should show respect to those ranked at the same level or above",
      },
      {
        subRule: 2,
        rule: "Escalated verbal or physical arguing is mildly encouraged",
      },
      {
        subRule: 3,
        rule: "Respect towards the Staff/Administration team and their decisions is enforced.",
      },
    ],
  },
  {
    ruleId: "B",
    ruleName: "Chat",
    rules: [
      {
        subRule: 1,
        rule: "GaryChat is to be used at ALL times, in lieu of any other digital chat, unless it is down",
      },
      {
        subRule: 2,
        rule: "Excessive use of naughty words (****) is prohibited",
      },
      {
        subRule: 3,
        rule: "GaryChat should be used to ridicule or bully any individual or group",
      },
      {
        subRule: 4,
        rule: "No GaryChat should be used if you are banned from Gary Portal or Gary Portal is under maintenance, unless explicit permission has been granted by an administrator",
      },
    ],
  },
  {
    ruleId: "C",
    ruleName: "(Abuse Of) Power",
    rules: [
      {
        subRule: 1,
        rule: "Any rank that gives users administrative or staffing powers is not designed to be abused",
      },
      {
        subRule: 2,
        rule: "Changing the name of the Announcements channel or a Team Chat is prohibited without an Administator's permission.",
      },
      {
        subRule: 3,
        rule: "If you are not Staff or above, do NOT try to enforce the rules.",
      },
    ],
  },
  {
    ruleId: "D",
    ruleName: "GaryFeed",
    rules: [
      {
        subRule: 1,
        rule: "All votes available to be voted on MUST be voted on",
      },
      {
        subRule: 2,
        rule: "To spread positivity, liking all GaryGram posts is strongly recommended",
      },
      {
        subRule: 3,
        rule: "Although posting of NSFW content is allowed, it is a requirement to stay mentally healthy and strong.",
      },
    ],
  },
  {
    ruleId: "E",
    ruleName: "Anti-Amigo / Positivity",
    rules: [
      {
        subRule: 1,
        rule: "No users are to engage in any Anti-Amigo or Negative actions",
      },
      {
        subRule: 2,
        rule: "No users are to engage in communication with anyone banned.",
      },
      {
        subRule: 3,
        rule: "'Boasting' or 'Outing' of personal information including but not limited to Sex, Sexual Orientation, Race etc. is forbidden.",
      },
      {
        subRule: 4,
        rule: "Your own personal or account details, i.e. passwords, are not to be shared",
      },
    ],
  },
  {
    ruleId: "F",
    ruleName: "Miscellaneous",
    rules: [
      {
        subRule: 1,
        rule: "Users are allowed to 'fight back' against decisions or comments in a friendly way",
      },
      {
        subRule: 2,
        rule: "No excessive self promotion. (i.e. promoting your social media page - unless it is an official Gary asset.)",
      },
      {
        subRule: 3,
        rule: "Ranks/points (or similar) are considered a privilege, abusing them will result in a ban.",
      },
      {
        subRule: 4,
        rule: "Al Murray recommends a maximum of 200 prayers a week, that's 150 simple prayers and 50 meaningful prayers, for a maximum prayer:fun ratio.",
      },
      {
        subRule: 5,
        rule: "Any glitch, error or bug within Gary Portal must be immediately reported and not abused. Any abuse or breaking of Gary Portal may result in actions defined under Policy G",
      },
    ],
  },
  {
    ruleId: "G",
    ruleName: "Breaking Policies",
    rules: [
      {
        subRule: 1,
        rule: "Punishments for breaking a Policy can include, but are not limited to:",
        ruleExamples: [
          { exampleId: 1, example: "Verbal Warnings" },
          { exampleId: 2, example: "Temporary Bans" },
          { exampleId: 3, example: "Extended Bans" },
          { exampleId: 4, example: "Account Resets" },
          { exampleId: 5, example: "Account Deletion" },
          { exampleId: 6, example: "Being Read Poetry" },
          {
            exampleId: 7,
            example: 'Being Told To Watch "The Boys" on Amazon Prime',
          },
        ],
      },
      {
        subRule: 2,
        rule: "Although Policy F(1) allows users to 'Fight Back' - doing so in a negative way or in such a way that violates any other Policy will result in breaking Policy G.",
      },
      {
        subRule: 3,
        rule: "A 'Three Strikes' system may be put into effect on your account - on violating three strikes, your account will be banned or terminated.",
      },
    ],
  },
];

export default rules;

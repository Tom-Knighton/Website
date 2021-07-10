export default interface Rule {
    ruleId: string,
    ruleName: string,
    rules: SubRule[]
}

interface SubRule {
    subRule: number,
    rule: string,
    ruleExamples?: RuleExample[] | null
}

interface RuleExample {
    exampleId: number,
    example: string
}
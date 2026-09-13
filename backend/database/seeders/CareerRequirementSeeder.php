<?php

namespace Database\Seeders;

use App\Models\Career;
use App\Models\CareerRequirement;
use Illuminate\Database\Seeder;

class CareerRequirementSeeder extends Seeder
{
    public function run(): void
    {
        $profiles = [
            'Product Management' => [
                ['product_sense', 'Product Sense', 4, 'high', [
                    'Do 3 teardown analyses of consumer apps you use daily',
                    'Shadow a product lifecycle from discovery to launch',
                    'Write and test one experiment hypothesis on a live product',
                ]],
                ['user_research', 'User Research', 3, 'high', [
                    'Run 3 customer interviews and document the patterns',
                    'Build a lightweight persona and journey map for one product',
                ]],
                ['data_fundamentals', 'Data Fundamentals', 3, 'high', [
                    'Learn SQL until you can answer 10 pre-defined product queries',
                    'Build a North Star metric framework for an app you use',
                ]],
                ['product_strategy', 'Strategy & Prioritization', 4, 'high', [
                    'Write 5 one-pagers using the RICE prioritization framework',
                    'Communicate one roadmap decision to a mock stakeholder',
                ]],
                ['communication', 'Communication & Influence', 4, 'medium', [
                    'Present an idea and get at least 3 people to act on it',
                    'Write a crisp PRD for a feature you proposed',
                ]],
                ['cross_team', 'Cross-functional Collaboration', 3, 'medium', [
                    'Ship a project with people from at least 3 different functions',
                    'Volunteer to coordinate a launch, event, or release',
                ]],
                ['internships', 'Relevant Internship Experience', 3, 'high', [
                    'Apply to 3 product internships at target companies',
                    'Land 1 product role on campus (association, org, startup)',
                ]],
                ['portfolio', 'Product Portfolio', 2, 'medium', [
                    'Write 2 public case studies of product work you did',
                    'Create a portfolio site documenting your process and results',
                ]],
            ],
            'Software Engineer' => [
                ['programming', 'Programming Fundamentals', 4, 'high', [
                    'Build 3 projects in one language with clean, readable structure',
                    'Solve 50 LeetCode easy/medium problems with explanations',
                ]],
                ['data_structures', 'Data Structures & Algorithms', 4, 'high', [
                    'Finish a structured DS&A course and 100 practice problems',
                    'Revise time/space complexity (Big-O) until it is second nature',
                ]],
                ['system_design', 'System Design', 3, 'high', [
                    'Paper-design 2 systems (e.g., URL shortener, chat app)',
                    'Learn core concepts: caching, queues, sharding, load balancing',
                ]],
                ['version_control', 'Git & Collaboration', 3, 'medium', [
                    'Contribute to 1 open-source project via a merged PR',
                    'Learn branch workflows, rebase, and code review etiquette',
                ]],
                ['software_projects', 'Software Projects', 4, 'high', [
                    'Ship 2 full-stack projects with automated tests',
                    'Deploy one project publicly and document it',
                ]],
                ['cloud_eng', 'Cloud & Tooling', 2, 'medium', [
                    'Deploy a service on a cloud platform (AWS, GCP, or Vercel)',
                    'Set up a CI pipeline for a personal project',
                ]],
                ['internships', 'Relevant Internship Experience', 3, 'high', [
                    'Apply to 3 software internships and track the outcomes',
                    'Do 1 technical interview mock with structured feedback',
                ]],
                ['certifications', 'Certifications & Coursework', 2, 'medium', [
                    'Complete a structured CS curriculum module or capstone',
                    'Earn 1 industry certificate (cloud, security, or a framework)',
                ]],
            ],
            'Management Consulting' => [
                ['case_interview', 'Case Interview Capability', 4, 'high', [
                    'Do 15 live case practices with peers or alumni',
                    'Build a personal library of 10 reusable case frameworks',
                ]],
                ['structured_problem_solving', 'Structured Problem Solving', 4, 'high', [
                    'Break down 3 business problems into hypothesis trees',
                    "Apply the 'so what' test to every analysis you write",
                ]],
                ['business_acumen', 'Business Acumen', 3, 'high', [
                    'Follow 2 industries weekly (news, reports, earning calls)',
                    'Summarize 5 business models into a 1-page memo each',
                ]],
                ['communication', 'Communication & Storytelling', 4, 'high', [
                    'Deliver 5 structured presentations to any audience',
                    'Write executive summaries with one clear recommendation',
                ]],
                ['analytics', 'Quantitative & Excel Analytics', 3, 'high', [
                    'Master Excel: modeling, dashboards, and scenario analysis',
                    'Complete a financial modeling mini-course',
                ]],
                ['networking', 'Professional Network', 3, 'high', [
                    'Do 3 coffee chats with consultants at target firms',
                    'Maintain a relationship tracker with scheduled follow-ups',
                ]],
                ['internships', 'Consulting Internship', 3, 'high', [
                    'Apply to 3 consulting internships',
                    'Join 1 campus consulting club or case competition',
                ]],
                ['gpa', 'GPA', 3, 'medium', [
                    'Keep GPA at or above 3.3/4.0 for target firms',
                    'Prepare a story for any GPA dip and what you did about it',
                ]],
            ],
            'Investment Banking' => [
                ['financial_modeling', 'Financial Modeling', 4, 'high', [
                    'Build a DCF model from scratch, from blank Excel',
                    'Complete 3 trading comps and 1 precedent transaction',
                ]],
                ['valuation', 'Valuation & Accounting', 4, 'high', [
                    'Learn the 3-statement integration (IS, BS, CF)',
                    'Understand the flow of funds (FOF) end to end',
                ]],
                ['excel', 'Excel Mastery', 3, 'high', [
                    'Practice keyboard-first modeling (no mouse)',
                    'Build a model where scenarios switch instantly',
                ]],
                ['technical_interviews', 'Technical Interview Prep', 3, 'high', [
                    'Practice 50 technical questions (accounting, valuation)',
                    'Do 5 mock interviews with peers or alumni',
                ]],
                ['markets_interest', 'Markets & Business Interest', 3, 'medium', [
                    'Read a financial paper or earnings call weekly',
                    'Summarize one deal or IPO trend into a short memo',
                ]],
                ['networking', 'Banking Network', 3, 'high', [
                    'Do 5 coffee chats with bankers at target banks',
                    'Follow up and maintain a relationship tracker',
                ]],
                ['internships', 'Relevant Internship Experience', 3, 'high', [
                    'Apply to 3 IB/finance internships',
                    'Build 1 financial or business-case competition project',
                ]],
                ['gpa', 'GPA', 3, 'high', [
                    'Keep GPA at or above 3.3/4.0 for target banks',
                    'Align finance/accounting electives with the target',
                ]],
            ],
            'Data Analyst' => [
                ['sql', 'SQL & Data Querying', 4, 'high', [
                    'Write 50 SQL queries covering join, group, and window patterns',
                    'Build a practice dashboard from a public dataset',
                ]],
                ['statistics', 'Statistics & Analytics', 3, 'high', [
                    'Learn hypothesis testing and A/B test basics',
                    'Run a simple experiment and present the result clearly',
                ]],
                ['data_visualization', 'Data Visualization', 3, 'high', [
                    'Build 5 charts that each tell a clear story',
                    'Gain proficiency in one BI tool (e.g., Tableau, Power BI)',
                ]],
                ['critical_thinking', 'Critical Thinking & Business Context', 3, 'high', [
                    'Write 3 memos connecting data to a business decision',
                    "Apply the 'so what' test to every analysis",
                ]],
                ['analytics_tools', 'Analytics Tooling', 3, 'medium', [
                    'Learn one scripting language for data (e.g., Python)',
                    'Automate one weekly manual report',
                ]],
                ['domain_knowledge', 'Domain & Product Knowledge', 2, 'medium', [
                    'Learn how your target industry defines its key metrics',
                    'Follow 2 analysts or sources in that industry',
                ]],
                ['portfolio', 'Analytics Portfolio', 3, 'high', [
                    'Publish 2 end-to-end analysis projects',
                    'Share your work on LinkedIn or a portfolio site',
                ]],
                ['certifications', 'Certifications & Coursework', 2, 'medium', [
                    'Complete a structured data analytics course',
                    'Earn 1 industry certificate (SQL, Python, or BI tool)',
                ]],
            ],
        ];

        foreach ($profiles as $careerName => $requirements) {
            $career = Career::where('name', $careerName)->first();

            if (! $career) {
                continue;
            }

            CareerRequirement::where('career_id', $career->id)->delete();

            foreach ($requirements as [$key, $label, $target, $importance, $actions]) {
                CareerRequirement::create([
                    'career_id' => $career->id,
                    'key' => $key,
                    'label' => $label,
                    'target_level' => $target,
                    'importance' => $importance,
                    'suggested_actions' => $actions,
                ]);
            }
        }
    }
}

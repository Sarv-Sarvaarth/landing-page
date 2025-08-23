-- Seed volunteer roles data
-- Run these queries to populate the volunteer_roles table with sample data

INSERT INTO volunteer_roles (
  title,
  description,
  requirements,
  skills_needed,
  time_commitment,
  location,
  is_active,
  max_volunteers,
  current_volunteers,
  created_at
) VALUES
(
  'Medical Camp Volunteer',
  'Assist in organizing and conducting free medical camps for underserved communities',
  '["Available on weekends","Good communication skills","Willingness to work in rural areas"]',
  '["Healthcare background preferred","Basic first aid knowledge","Local language skills"]',
  'Weekends (6-8 hours per camp)',
  'Rural and remote areas',
  1,
  10,
  3,
  CURRENT_TIMESTAMP
),
(
  'Education Support Volunteer',
  'Help with teaching and educational program development for children and adults',
  '["Patience with learners","Flexible schedule","Commitment for at least 3 months"]',
  '["Teaching or educational background","Subject matter expertise","Creative lesson planning"]',
  'Flexible (4-6 hours per week)',
  'Schools and community centers',
  1,
  15,
  8,
  CURRENT_TIMESTAMP
),
(
  'Event Coordination Volunteer',
  'Support fundraising events, awareness campaigns, and community outreach programs',
  '["Strong organizational skills","Ability to work in teams","Available for event days"]',
  '["Event planning experience","Communication and coordination skills","Social media knowledge"]',
  '10-15 hours per month',
  'Various event venues',
  1,
  8,
  5,
  CURRENT_TIMESTAMP
),
(
  'Digital Marketing Volunteer',
  'Help with social media management, content creation, and online outreach to expand our reach',
  '["Access to reliable internet","Creative mindset","Understanding of social causes"]',
  '["Digital marketing experience","Content creation skills","Social media platform knowledge","Basic graphic design"]',
  'Remote (5-10 hours per week)',
  'Remote work',
  1,
  5,
  2,
  CURRENT_TIMESTAMP
),
(
  'Community Outreach Volunteer',
  'Connect with local communities to identify needs and build relationships for sustainable programs',
  '["Strong interpersonal skills","Cultural sensitivity","Willingness to travel locally"]',
  '["Community engagement experience","Local language proficiency","Research and documentation skills"]',
  'Part-time (20-25 hours per month)',
  'Community centers and field visits',
  1,
  6,
  4,
  CURRENT_TIMESTAMP
);

-- Verify the data was inserted
SELECT
  id,
  title,
  time_commitment,
  location,
  current_volunteers,
  max_volunteers,
  is_active
FROM volunteer_roles
ORDER BY id;

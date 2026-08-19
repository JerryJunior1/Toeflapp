import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const tasks = [
  {
    "topic_title": "1. To maintain good health",
    "professor_prompt": "Today, we are going to talk about whether it has become easier to maintain good health than it was in the past. As the economy prospers and technologies evolve, more and more people have come to realize the importance of maintaining good health. Though people nowadays know and care more about health, the problem is, is it more challenging or easier for people to maintain good health today?",
    "student_1_name": "Claire",
    "student_1_response": "I think it has become easier for modern people to keep healthy. Thanks to economic growth, people have enjoyed higher incomes and thus higher living standards. Therefore, most people, compared to people in the past, have more money at their disposal to spend on healthier lifestyles. In other words, they can afford proper medical treatments while they are sick. Besides, they can eat in a more nutritious and balanced way.",
    "student_2_name": "Paul",
    "student_2_response": "Although I share Claire's view that people have become wealthier, I still believe that it has become more challenging for people to maintain good health. Due to technological progress, life has become more convenient: people can do almost anything indoors with just a few taps or clicks. They can just order food and shop online, take online courses, and entertain themselves without heading out to do everything in person, unlike people in the past. As a result, people today exercise much less than ever before, and such laziness, inevitably, has considerably contributed to many more health problems today.",
    "model_answer": "I totally agree with Paul's idea that it has become more challenging for individuals to keep good health today. First, by the advancement of the technology, mobile phone, and social media people are more likely to check their smartphones and updates constantly. This habit can lead to several problems in people's mental health. In fact, constant comparison on several social media platforms, such as Instagram, can cause several issues, such as depression and anxiety, especially among young individuals. In addition, nowadays industries are developing; therefore, they release more pollutants into the air. In other words, constant exposure to the pollutants can lead to fatal respiratory diseases, which can have a long- term effect on people's physical health. Overall, nowadays technologies and industries are improving, so it is difficult for people to maintain a good lifestyle and health."
  },
  {
    "topic_title": "2. To slow down the economy to protect the environment",
    "professor_prompt": "Humans live in the environment, depending on it as well. We need everything from the environment: food, clothing, medicine, and the list goes on. As the economy develops, we humans are struggling to strike a balance between the economy and the environment. Before the next class, I want you to talk about the following question:\nShould we slow down economic development to protect the environment?",
    "student_1_name": "Claire",
    "student_1_response": "I think economic development comes before the environment. If people cannot live well enough, they would ensure their survival even at the cost of the environment. Especially in less developed areas, when the slow economic growth can hardly meet people's basic needs, the environment would be at stake. To be more specific, people need food and products to support themselves and their families. When they are short of proper supplies of living essentials, it is understandable that they would grow food and manufacture products to survive, even at the cost of the environment. They are not the ones to blame because survival is the priority of everybody. In this case, the culprit of the worsening environment is the backward economy in such underdeveloped areas.",
    "student_2_name": "Paul",
    "student_2_response": "I still think that the top priority is the environment. Without the environment and everything it has been and will be providing for humans, we cannot even exist, not to mention boosting the economy! For the long-term development and prosperity of human society, we should realize the significance of environmental protection and slow down the economy to better preserve animals, plants, and our planet Earth. Only by protecting the environment can humans and human civilization go a long way.",
    "model_answer": "I totally agree with Paul's idea that we should slow down economic development to maintain the environment. I believe that economic development has several negative effects on the environment. One of the most significant negative effects of this development is deforestation. In fact, governments cut down trees for several purposes, such as constructing roads or large buildings. This approach can decrease the air quality, which can cause several problems. For example, people might suffer from fatal respiratory diseases, which can have a long-term effect on their physical health. In addition, by the technological and economic growth, industries are more likely to destroy the environment for their goals. This strategy can destroy many animals' habitat, which can cause several problems in the ecosystem in our planet. Overall, decreasing the rate of economic progress can be beneficial to the environment and people."
  },
  {
    "topic_title": "3. How to protect the environment in daily lives",
    "professor_prompt": "As environmental protection develops, more people have come to realize that everybody should play a part in preserving the planet we live on. These years, many people want to protect and improve the natural environment. In terms of what individuals in their daily lives could do if they want to protect the environment, some put forward walking or bicycling instead of driving a car to work or school, while others recommend buying locally grown organic foods grown without pesticides, and which one do you think would work better?",
    "student_1_name": "Lila",
    "student_1_response": "I think walking or cycling instead of driving works better in reducing carbon emissions. Everybody needs to commute, and a lot of people drive every day. If they can switch to walking or riding bicycles, the outcome of such a collective effort would be considerable.",
    "student_2_name": "Paul",
    "student_2_response": "Buying locally grown organic foods is more effective, I think. Growing crops organically means giving up pesticides to get rid of pests, which significantly reduces pollutants that pose great threats to soil and water. Therefore, the food chain could be less contaminated.",
    "model_answer": "I totally agree with Lila's idea that walking and cycling instead of driving is better than purchasing organic foods. First, these habits can improve the air quality. In fact, vehicles release carbon dioxide and pollutants into the air, which can lead to decreased air quality. In other words, if people choose to use bicycles instead of their own private cars, they will breathe fresh air, which can have a positive long-term effect on their physical health. In addition, these behaviors can prevent deforestation. In fact, governments mostly cut down trees to construct roads or large buildings. If people tend to use bicycles, governments will try to create parks and green spaces instead of constructing roads. Overall, these excellent habits from people can protect our planet and the environment."
  }
];

async function insert() {
  for (const t of tasks) {
    console.log("Inserting:", t.topic_title);
    const { error } = await supabase.from('academic_tasks').insert(t);
    if (error) console.error("Error:", error);
  }
  console.log("Done inserting.");
}

insert();

"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { nanoid } from "nanoid";
import { openai } from "@ai-sdk/openai";
import Markdown from "react-markdown";
import { z } from "zod";
import { getCoursesWithKeywords } from "./actions";
import { redirect } from "next/navigation";
import ResetPassword from "./reset-password/page";
import CourseGrid from "@/components/CourseGrid";

export const AI = createAI({
  actions: {
    resetPassword: async (reason?: string) => {
      // Directly use redirect here
      redirect("/reset-password");
    },

    continueConversation: async (input: string) => {
      const history = getMutableAIState();

      const result = await streamUI({
        model: openai("gpt-3.5-turbo"),
        messages: [...history.get(), { role: "user", content: input }],
        text: ({ done, content }) => {
          if (done) {
            history.done([...history.get(), { role: "assistant", content }]);
          }

          return (
            <Markdown
              components={{
                p: ({ children }) => <p className="py-2">{children}</p>,
              }}
            >
              {content}
            </Markdown>
          );
        },
        tools: {
          getSupport: {
            description: "Redirect user to reset password page",
            parameters: z.object({
              reason: z
                .string()
                .optional()
                .describe("Optional reason for resetting password"),
            }),
            generate: async function* ({ reason }) {
              return <ResetPassword />;
            },
          },
          getCourses: {
            description: "Get courses by a prompt",
            parameters: z.object({
              prompt: z.string().describe("The prompt to get courses by"),
            }),
            generate: async function* ({ prompt }) {
              const courses = await getCoursesWithKeywords(prompt);
              return <CourseGrid courses={courses} />;
            },
          },
          // ... other tools remain the same
        },
      });

      return {
        id: nanoid(),
        role: "assistant",
        display: result.value,
      };
    },
  },
  initialAIState: [],
  initialUIState: [],
});

import { z } from "zod";
import { Color, colorKeys } from "../colors";

//
// TASK PRIORITY
// ----------------------------------------------------------------------

export const taskPriorityInputSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1).max(255),
  color: z
    .enum(colorKeys as [Color])
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const taskPriorityOutputSchema = taskPriorityInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskPriorityInput = z.infer<typeof taskPriorityInputSchema>;
export type TaskPriorityOutput = z.infer<typeof taskPriorityOutputSchema>;

//
// TASK LABEL
// ----------------------------------------------------------------------

export const taskLabelInputSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1).max(255),
  color: z
    .enum(colorKeys as [Color])
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const taskLabelOutputSchema = taskLabelInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskLabelInput = z.infer<typeof taskLabelInputSchema>;
export type TaskLabelOutput = z.infer<typeof taskLabelOutputSchema>;

//
// TASK STATUS
// ----------------------------------------------------------------------

export const taskStatusInputSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1).max(255),
  color: z
    .enum(colorKeys as [Color])
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const taskStatusOutputSchema = taskStatusInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskStatusInput = z.infer<typeof taskStatusInputSchema>;
export type TaskStatusOutput = z.infer<typeof taskStatusOutputSchema>;

//
// TASK
// ----------------------------------------------------------------------

export const taskInputSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1).max(255),
  description: z
    .string()
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
  statusId: z
    .string()
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
  priorityId: z
    .string()
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
  labelId: z
    .string()
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const taskOutputSchema = taskInputSchema.merge(
  z.object({
    id: z.string(),
    number: z.number(),
    key: z.string(),
    label: taskLabelOutputSchema
      .optional()
      .nullish()
      .transform((x) => x ?? undefined),
    priority: taskPriorityOutputSchema
      .optional()
      .nullish()
      .transform((x) => x ?? undefined),
    status: taskStatusOutputSchema
      .optional()
      .nullish()
      .transform((x) => x ?? undefined),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskInput = z.infer<typeof taskInputSchema>;
export type TaskOutput = z.infer<typeof taskOutputSchema>;

//
// TASK WATCH
// ----------------------------------------------------------------------
export const taskWatchInputSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
});

export const taskWatchOutputSchema = taskWatchInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskWatchInput = z.infer<typeof taskWatchInputSchema>;
export type TaskWatchOutput = z.infer<typeof taskWatchOutputSchema>;

//
// TASK ASSIGNEE
// ----------------------------------------------------------------------

export const taskAssigneeInputSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
});

export const taskAssigneeOutputSchema = taskAssigneeInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskAssigneeInput = z.infer<typeof taskAssigneeInputSchema>;
export type TaskAssigneeOutput = z.infer<typeof taskAssigneeOutputSchema>;

//
// TASK VERSION
// ----------------------------------------------------------------------

export const taskVersionInputSchema = z.object({
  taskId: z.string(),
  name: z.string().min(1).max(255),
  content: z
    .object({
      blocks: z.array(
        z.object({
          type: z.string(),
          data: z.object({}),
        }),
      ),
    })
    .optional(),
});

export const taskVersionOutputSchema = taskVersionInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskVersionInput = z.infer<typeof taskVersionInputSchema>;
export type TaskVersionOutput = z.infer<typeof taskVersionOutputSchema>;

//
// TASK REACTION
// ----------------------------------------------------------------------

export const taskReactionInputSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
  reaction: z.string(),
});

export const taskReactionOutputSchema = taskReactionInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskReactionInput = z.infer<typeof taskReactionInputSchema>;
export type TaskReactionOutput = z.infer<typeof taskReactionOutputSchema>;

//
// TASK COMMENT
// ----------------------------------------------------------------------

export const taskCommentInputSchema = z.object({
  content: z.string().max(255),
  taskId: z.string(),
  userId: z.string(),
  commentId: z.string().optional(),
});

export const taskCommentOutputSchema = taskCommentInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskCommentInput = z.infer<typeof taskCommentInputSchema>;
export type TaskCommentOutput = z.infer<typeof taskCommentOutputSchema>;

//
// TASK COMMENT VERSION
// ----------------------------------------------------------------------

export const taskCommentVersionInputSchema = z.object({
  commentId: z.string(),
  content: z.string().max(255),
});

export const taskCommentVersionOutputSchema =
  taskCommentVersionInputSchema.merge(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  );

export type TaskCommentVersionInput = z.infer<
  typeof taskCommentVersionInputSchema
>;
export type TaskCommentVersionOutput = z.infer<
  typeof taskCommentVersionOutputSchema
>;

//
// TASK COMMENT REACTION
// ----------------------------------------------------------------------

export const taskCommentReactionInputSchema = z.object({
  commentId: z.string(),
  userId: z.string(),
  reaction: z.string(),
});

export const taskCommentReactionOutputSchema =
  taskCommentReactionInputSchema.merge(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  );

export type TaskCommentReactionInput = z.infer<
  typeof taskCommentReactionInputSchema
>;
export type TaskCommentReactionOutput = z.infer<
  typeof taskCommentReactionOutputSchema
>;

//
// TASK ATTACHMENT
// ----------------------------------------------------------------------

export const taskAttachmentInputSchema = z.object({
  taskId: z.string(),
  name: z.string().min(1).max(255),
  url: z.string().max(255),
  filePath: z.string().max(255),
  mimeType: z.string().max(255),
  size: z.number(),
  originalName: z.string().max(255),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});

export const taskAttachmentOutputSchema = taskAttachmentInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type TaskAttachmentInput = z.infer<typeof taskAttachmentInputSchema>;
export type TaskAttachmentOutput = z.infer<typeof taskAttachmentOutputSchema>;

import { z } from "zod";

//
// # PROJECT
// ----------------------------------------------------------------------

export const projectInputSchema = z.object({
  key: z.string().min(1).max(10),
  name: z.string().min(3).max(255),
  description: z
    .string()
    .optional()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const projectOutputSchema = projectInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type ProjectOutput = z.infer<typeof projectOutputSchema>;

//
// PROJECT MEDIA
// ----------------------------------------------------------------------

export const projectMediaInputSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  mimeType: z.string(),
  size: z.number(),
  originalName: z.string(),
  dimensions: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});

export const projectMediaOutputSchema = projectMediaInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectMediaInput = z.infer<typeof projectMediaInputSchema>;
export type ProjectMediaOutput = z.infer<typeof projectMediaOutputSchema>;

//
// PROJECT STATUS
// ----------------------------------------------------------------------

export const projectStatusInputSchema = z.object({
  name: z.string().max(255),
  color: z.string().max(255).optional(),
});

export const projectStatusOutputSchema = projectStatusInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectStatusInput = z.infer<typeof projectStatusInputSchema>;
export type ProjectStatusOutput = z.infer<typeof projectStatusOutputSchema>;

//
// PROJECT STAR
// ----------------------------------------------------------------------

export const ProjectStarInputSchema = z.object({
  projectId: z.string(),
});

export const ProjectStarOutputSchema = ProjectStarInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectStarInput = z.infer<typeof ProjectStarInputSchema>;
export type ProjectStarOutput = z.infer<typeof ProjectStarOutputSchema>;

//
// PROJECT VERSION
// ----------------------------------------------------------------------

export const projectVersionInputSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const projectVersionOutputSchema = projectVersionInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectVersionInput = z.infer<typeof projectVersionInputSchema>;
export type ProjectVersionOutput = z.infer<typeof projectVersionOutputSchema>;

//
// PROJECT ROLE
// ----------------------------------------------------------------------

export const projectRoleInputSchema = z.object({
  projectId: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const projectRoleOutputSchema = projectRoleInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectRoleInput = z.infer<typeof projectRoleInputSchema>;
export type ProjectRoleOutput = z.infer<typeof projectRoleOutputSchema>;

//
// PROJECT MEMBER
// ----------------------------------------------------------------------

export const projectMemberInputSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
  roleId: z.string(),
});

export const projectMemberOutputSchema = projectMemberInputSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export type ProjectMemberInput = z.infer<typeof projectMemberInputSchema>;
export type ProjectMemberOutput = z.infer<typeof projectMemberOutputSchema>;

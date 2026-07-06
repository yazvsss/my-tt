export const Schema = z.object({
  世界: z.object({
    日期: z.string(),
    星期: z.string(),
    当前时间: z.string(),
    地点: z.string(),
  }),

  姬凌雪: z.object({
    当前行动: z.string(),
    内心想法: z.string(),
    欲望值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    穿着: z.string(),
    口腔: z.string(),
    胸部: z.string(),
    小穴: z.string(),
    后庭: z.string(),
    子宫精液量: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    是否怀孕: z.string(),
  }),

  监狱: z.object({
    监狱稳定度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    上级压力度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),

  帮派: z.object({
    黑虎会忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    北极帮忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    南十字忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    铁锤帮忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    雅利安兄弟会忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),

  黑石卡: z.object({
    持有者: z.string(),
  }),
});
export type Schema = z.output<typeof Schema>;

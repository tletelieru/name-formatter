export const twoColumns = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  columnGap: 4,
} as const;

export const columnRow = (index: number) => ({
  borderTop: { xs: index === 0 ? 0 : 1, md: index < 2 ? 0 : 1 },
  pt: { xs: index === 0 ? 0.5 : 1.5, md: index < 2 ? 0.5 : 1.5 },
});
